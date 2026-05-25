import type {
  BackendApplication,
  BackendDeveloper,
  BackendLog,
  BackendPagination,
} from '@/api/types'
import type { Application, ApplicationDetail } from '@/types/application'
import type { User } from '@/types/auth'
import type { LogEntry, PaginatedLogs } from '@/types/log'

export function mapDeveloper(dev: BackendDeveloper): User {
  return {
    id: dev.id,
    name: dev.username,
    email: dev.email,
  }
}

export function mapApplication(app: BackendApplication): Application {
  return {
    id: app._id,
    name: app.name,
    createdAt: app.createdAt,
    logCount: app.logCount ?? 0,
  }
}

export function mapApplicationDetail(app: BackendApplication): ApplicationDetail {
  return {
    ...mapApplication(app),
    lastActivity: app.lastActivity ?? null,
  }
}

export function mapLog(log: BackendLog): LogEntry {
  return {
    id: log._id,
    applicationId: log.application,
    message: log.message,
    level: log.level,
    count: log.count,
    firstOccurrence: log.createdAt,
    lastOccurrence: log.updatedAt,
  }
}

export function mapPaginatedLogs(
  logs: BackendLog[],
  pagination: BackendPagination
): PaginatedLogs {
  return {
    items: logs.map(mapLog),
    total: pagination.totalCount,
    page: pagination.page,
    pageSize: pagination.limit,
    totalPages: pagination.totalPages,
  }
}
