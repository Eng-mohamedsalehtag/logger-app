import { apiClient } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import { mockAdapter } from '@/mock/mockAdapter'
import type { LevelDistribution, TimeSeriesPoint } from '@/types/analytics'

const useMock = import.meta.env.VITE_USE_MOCK !== 'false'

export async function getLogLevelDistribution(
  appName: string
): Promise<LevelDistribution[]> {
  if (useMock) return mockAdapter.getLogLevelDistribution(appName)

  const data = await apiClient.get<{ distribution: LevelDistribution[] }>(
    endpoints.analytics.distribution(appName)
  )
  return data.distribution
}

export async function getLogsOverTime(
  appName: string,
  days?: number
): Promise<TimeSeriesPoint[]> {
  if (useMock) return mockAdapter.getLogsOverTime(appName, days)

  const data = await apiClient.get<{ timeSeries: TimeSeriesPoint[] }>(
    endpoints.analytics.timeseries(appName, days ?? 14)
  )
  return data.timeSeries
}
