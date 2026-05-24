import { apiClient } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import { mapPaginatedLogs } from '@/api/mappers'
import type { BackendLog, BackendPagination } from '@/api/types'
import { mockAdapter } from '@/mock/mockAdapter'
import type { LogQueryParams, PaginatedLogs } from '@/types/log'

const useMock = import.meta.env.VITE_USE_MOCK !== 'false'

function buildQuery(params: LogQueryParams): string {
  const q = new URLSearchParams()
  if (params.page) q.set('page', String(params.page))
  if (params.pageSize) q.set('limit', String(params.pageSize))
  if (params.search?.trim()) q.set('search', params.search.trim())
  if (params.level && params.level !== 'ALL') q.set('level', params.level)
  if (params.sort === 'most_occurred') q.set('sort', 'most_occurred')
  const qs = q.toString()
  return qs ? `?${qs}` : ''
}

export async function getLogs(
  appName: string,
  params: LogQueryParams
): Promise<PaginatedLogs> {
  if (useMock) return mockAdapter.getLogs(appName, params)

  const data = await apiClient.get<{
    logs: BackendLog[]
    pagination: BackendPagination
  }>(`${endpoints.logs(appName)}${buildQuery(params)}`)

  return mapPaginatedLogs(data.logs, data.pagination)
}
