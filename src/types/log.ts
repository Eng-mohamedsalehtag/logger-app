import type { LogLevel } from '@/lib/utils'

export interface LogEntry {
  id: string
  applicationId: string
  message: string
  level: LogLevel
  count: number
  firstOccurrence: string
  lastOccurrence: string
}

export type LogSort = 'most_recent' | 'most_occurred'

export interface LogQueryParams {
  page?: number
  pageSize?: number
  search?: string
  level?: LogLevel | 'ALL'
  sort?: LogSort
}

export interface PaginatedLogs {
  items: LogEntry[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
