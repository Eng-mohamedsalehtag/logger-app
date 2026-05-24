import { useCallback, useEffect, useState } from 'react'
import type { LogQueryParams, PaginatedLogs } from '@/types/log'
import * as logService from '@/services/logService'

export function useLogs(appName: string, params: LogQueryParams) {
  const [data, setData] = useState<PaginatedLogs | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!appName) return
    setLoading(true)
    setError(null)
    try {
      const result = await logService.getLogs(appName, params)
      setData(result)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load logs')
    } finally {
      setLoading(false)
    }
  }, [appName, params.page, params.pageSize, params.search, params.level, params.sort])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { data, loading, error, refresh }
}
