import { useCallback, useEffect, useState } from 'react'
import type { DashboardStats } from '@/types/dashboard'
import * as dashboardService from '@/services/dashboardService'

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [apiKey, setApiKey] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [s, key] = await Promise.all([
        dashboardService.getDashboardStats(),
        dashboardService.getApiKey(),
      ])
      setStats(s)
      setApiKey(key)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let ignore = false
    Promise.resolve().then(() => {
      if (!ignore) {
        refresh()
      }
    })
    return () => {
      ignore = true
    }
  }, [refresh])

  return { stats, apiKey, loading, error, refresh }
}
