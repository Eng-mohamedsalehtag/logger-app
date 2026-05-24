export interface ApiSuccess<T> {
  status: 'success'
  message: string
  data: T
}

export interface ApiErrorBody {
  status: 'error'
  message: string
}

export interface BackendDeveloper {
  id: string
  username: string
  email: string
  apiKey: string
}

export interface BackendApplication {
  _id: string
  name: string
  createdAt: string
  updatedAt?: string
  logCount?: number
  lastActivity?: string | null
}

export interface BackendLog {
  _id: string
  message: string
  level: 'INFO' | 'WARN' | 'ERROR'
  count: number
  application: string
  createdAt: string
  updatedAt: string
}

export interface BackendPagination {
  page: number
  limit: number
  totalCount: number
  totalPages: number
}
