import { useCallback, useEffect, useState } from 'react'
import type { LevelDistribution, TimeSeriesPoint } from '@/types/analytics'
import * as analyticsService from '@/services/analyticsService'

export function useAnalytics(appName: string) {
  const [distribution, setDistribution] = useState<LevelDistribution[]>([])
  const [timeSeries, setTimeSeries] = useState<TimeSeriesPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!appName) {
      setDistribution([])
      setTimeSeries([])
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const [dist, series] = await Promise.all([
        analyticsService.getLogLevelDistribution(appName),
        analyticsService.getLogsOverTime(appName, 14),
      ])
      setDistribution(dist)
      setTimeSeries(series)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }, [appName])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { distribution, timeSeries, loading, error, refresh }
}
