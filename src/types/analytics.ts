import type { LogLevel } from '@/lib/utils'

export interface LevelDistribution {
  level: LogLevel
  count: number
  percentage: number
}

export interface TimeSeriesPoint {
  date: string
  INFO: number
  WARN: number
  ERROR: number
}
