import type { TimeSeriesPoint } from '@/types/analytics'
import { useMemo } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Skeleton } from '@/components/ui/Skeleton'

const COLORS = {
  INFO: '#60a5fa',
  WARN: '#fbbf24',
  ERROR: '#f87171',
}

const CHART_HEIGHT = 320

interface LogsLineChartProps {
  data: TimeSeriesPoint[]
  loading?: boolean
}

function normalizeSeries(data: TimeSeriesPoint[]): TimeSeriesPoint[] {
  return data.map((point) => ({
    date: point.date,
    INFO: Number(point.INFO) || 0,
    WARN: Number(point.WARN) || 0,
    ERROR: Number(point.ERROR) || 0,
  }))
}

function hasActivity(data: TimeSeriesPoint[]): boolean {
  return data.some((p) => p.INFO > 0 || p.WARN > 0 || p.ERROR > 0)
}

export function LogsLineChart({ data, loading }: LogsLineChartProps) {
  const series = useMemo(() => normalizeSeries(data), [data])

  if (loading) {
    return <Skeleton className="h-[320px] w-full" />
  }

  if (series.length === 0) {
    return (
      <div
        className="flex h-[320px] w-full items-center justify-center rounded-lg border border-dashed border-border text-sm text-text-muted"
        role="status"
      >
        No log activity in the selected period.
      </div>
    )
  }

  const showEmptyHint = !hasActivity(series)

  return (
    <div className="w-full min-w-0" style={{ height: CHART_HEIGHT }}>
      {showEmptyHint && (
        <p className="mb-2 text-center text-xs text-text-muted">
          No logs recorded in the last 14 days. Send logs via the SDK to see trends here.
        </p>
      )}
      <ResponsiveContainer
        width="100%"
        height={showEmptyHint ? CHART_HEIGHT - 24 : CHART_HEIGHT}
        initialDimension={{ width: 600, height: CHART_HEIGHT }}
        debounce={50}
        minWidth={0}
      >
        <LineChart
          data={series}
          margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="date"
            stroke="#71717a"
            tick={{ fill: '#71717a', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke="#71717a"
            tick={{ fill: '#71717a', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            allowDecimals={false}
            domain={[0, (max: number) => Math.max(max, 4)]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#16161f',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              color: '#e4e4e7',
            }}
          />
          <Legend formatter={(value) => <span style={{ color: '#e4e4e7' }}>{value}</span>} />
          <Line
            type="monotone"
            dataKey="INFO"
            name="INFO"
            stroke={COLORS.INFO}
            strokeWidth={2}
            dot={{ r: 3, fill: COLORS.INFO }}
            activeDot={{ r: 5 }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="WARN"
            name="WARN"
            stroke={COLORS.WARN}
            strokeWidth={2}
            dot={{ r: 3, fill: COLORS.WARN }}
            activeDot={{ r: 5 }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="ERROR"
            name="ERROR"
            stroke={COLORS.ERROR}
            strokeWidth={2}
            dot={{ r: 3, fill: COLORS.ERROR }}
            activeDot={{ r: 5 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
