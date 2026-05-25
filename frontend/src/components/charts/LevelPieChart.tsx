import type { LevelDistribution } from '@/types/analytics'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Skeleton } from '@/components/ui/Skeleton'

const COLORS = {
  INFO: '#60a5fa',
  WARN: '#fbbf24',
  ERROR: '#f87171',
}

interface LevelPieChartProps {
  data: LevelDistribution[]
  loading?: boolean
}

export function LevelPieChart({ data, loading }: LevelPieChartProps) {
  if (loading) {
    return <Skeleton className="h-[320px] w-full" />
  }

  const chartData = data.map((d) => ({
    name: d.level,
    value: d.count,
    percentage: d.percentage,
  }))

  return (
    <div className="w-full min-w-0" style={{ height: 320 }}>
      <ResponsiveContainer
        width="100%"
        height={320}
        initialDimension={{ width: 400, height: 320 }}
        debounce={50}
        minWidth={0}
      >
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
            stroke="transparent"
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name as keyof typeof COLORS]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#16161f',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              color: '#e4e4e7',
            }}
            formatter={(value, name, item) => {
              const pct = (item?.payload as { percentage?: number })?.percentage ?? 0
              return [`${value ?? 0} (${pct}%)`, String(name)]
            }}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: '#e4e4e7' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
