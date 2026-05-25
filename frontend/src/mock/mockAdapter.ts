import { subDays, format } from 'date-fns'
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '@/types/auth'
import type { Application, ApplicationDetail } from '@/types/application'
import type { LogQueryParams, PaginatedLogs } from '@/types/log'
import type { LevelDistribution, TimeSeriesPoint } from '@/types/analytics'
import type { DashboardStats } from '@/types/dashboard'
import type { LogLevel } from '@/lib/utils'
import { delay } from '@/lib/utils'
import { initialApplications } from './data/applications'
import { initialLogs } from './data/logs'
import { mockUser, MOCK_API_KEY } from './data/users'

let applications = [...initialApplications]
let logs = [...initialLogs]

const MOCK_DELAY = 300

export const mockAdapter = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(MOCK_DELAY)
    if (!credentials.email || !credentials.password) {
      throw new Error('Invalid credentials')
    }
    return {
      token: 'mock_jwt_' + Date.now(),
      user: { ...mockUser, email: credentials.email },
    }
  },

  async register(data: RegisterCredentials): Promise<AuthResponse> {
    await delay(MOCK_DELAY)
    return {
      token: 'mock_jwt_' + Date.now(),
      user: { id: 'user-new', name: data.name, email: data.email },
    }
  },

  async getApplications(search?: string): Promise<Application[]> {
    await delay(150)
    let result = [...applications]
    if (search?.trim()) {
      const q = search.toLowerCase()
      result = result.filter((a) => a.name.toLowerCase().includes(q))
    }
    return result
  },

  async createApplication(name: string): Promise<Application> {
    await delay(MOCK_DELAY)
    const app: Application = {
      id: `app-${Date.now()}`,
      name: name.trim(),
      createdAt: new Date().toISOString(),
      logCount: 0,
    }
    applications = [app, ...applications]
    return app
  },

  async deleteApplication(idOrName: string): Promise<void> {
    await delay(MOCK_DELAY)
    const app = applications.find((a) => a.id === idOrName || a.name === idOrName)
    if (!app) return
    applications = applications.filter((a) => a.id !== app.id)
    logs = logs.filter((l) => l.applicationId !== app.id)
  },

  async getApplicationById(idOrName: string): Promise<ApplicationDetail | null> {
    await delay(150)
    const app = applications.find((a) => a.id === idOrName || a.name === idOrName)
    if (!app) return null
    const appLogs = logs.filter((l) => l.applicationId === app.id)
    const lastActivity =
      appLogs.length > 0
        ? appLogs.reduce((max, l) =>
            new Date(l.lastOccurrence) > new Date(max) ? l.lastOccurrence : max,
          appLogs[0].lastOccurrence)
        : null
    return { ...app, logCount: appLogs.length, lastActivity }
  },

  async getLogs(appId: string, params: LogQueryParams): Promise<PaginatedLogs> {
    await delay(MOCK_DELAY)
    const page = params.page ?? 1
    const pageSize = params.pageSize ?? 10
    let filtered = logs.filter((l) => l.applicationId === appId)

    if (params.search?.trim()) {
      const q = params.search.toLowerCase()
      filtered = filtered.filter((l) => l.message.toLowerCase().includes(q))
    }

    if (params.level && params.level !== 'ALL') {
      filtered = filtered.filter((l) => l.level === params.level)
    }

    if (params.sort === 'most_occurred') {
      filtered = [...filtered].sort((a, b) => b.count - a.count)
    } else {
      filtered = [...filtered].sort(
        (a, b) =>
          new Date(b.lastOccurrence).getTime() - new Date(a.lastOccurrence).getTime()
      )
    }

    const total = filtered.length
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const start = (page - 1) * pageSize
    const items = filtered.slice(start, start + pageSize)

    return { items, total, page, pageSize, totalPages }
  },

  async getLogLevelDistribution(appId: string): Promise<LevelDistribution[]> {
    await delay(MOCK_DELAY)
    const appLogs = logs.filter((l) => l.applicationId === appId)
    const counts: Record<LogLevel, number> = { INFO: 0, WARN: 0, ERROR: 0 }
    for (const log of appLogs) {
      counts[log.level] += log.count
    }
    const total = counts.INFO + counts.WARN + counts.ERROR || 1
    return (['INFO', 'WARN', 'ERROR'] as const).map((level) => ({
      level,
      count: counts[level],
      percentage: Math.round((counts[level] / total) * 100),
    }))
  },

  async getLogsOverTime(appId: string, days = 14): Promise<TimeSeriesPoint[]> {
    await delay(MOCK_DELAY)
    const appLogs = logs.filter((l) => l.applicationId === appId)
    const now = new Date('2026-05-21T12:00:00.000Z')
    const points: TimeSeriesPoint[] = []

    for (let d = days - 1; d >= 0; d--) {
      const day = subDays(now, d)
      const dayStr = format(day, 'yyyy-MM-dd')
      const dayStart = new Date(dayStr).getTime()
      const dayEnd = dayStart + 86400000
      const point: TimeSeriesPoint = { date: format(day, 'MMM d'), INFO: 0, WARN: 0, ERROR: 0 }

      for (const log of appLogs) {
        const t = new Date(log.lastOccurrence).getTime()
        if (t >= dayStart && t < dayEnd) {
          point[log.level] += log.count
        }
      }

      if (point.INFO + point.WARN + point.ERROR === 0) {
        point.INFO = 12 + (d * 3) % 20
        point.WARN = 4 + (d * 2) % 8
        point.ERROR = 1 + d % 5
      }

      points.push(point)
    }

    return points
  },

  async getDashboardStats(): Promise<DashboardStats> {
    await delay(150)
    const infoLogs = logs.filter((l) => l.level === 'INFO').reduce((s, l) => s + l.count, 0)
    const warnLogs = logs.filter((l) => l.level === 'WARN').reduce((s, l) => s + l.count, 0)
    const errorLogs = logs.filter((l) => l.level === 'ERROR').reduce((s, l) => s + l.count, 0)
    return {
      totalApplications: applications.length,
      totalLogs: logs.reduce((s, l) => s + l.count, 0),
      infoLogs,
      warnLogs,
      errorLogs,
    }
  },

  async getApiKey(): Promise<string> {
    await delay(100)
    return MOCK_API_KEY
  },
}
