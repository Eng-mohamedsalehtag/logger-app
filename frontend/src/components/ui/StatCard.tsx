import { cn, formatNumber } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from './Card'

interface StatCardProps {
  title: string
  value: number
  icon: LucideIcon
  accent?: 'default' | 'info' | 'warn' | 'error'
}

const accentStyles = {
  default: 'from-accent-purple/10 to-accent-blue/10 text-accent-purple',
  info: 'from-info/10 to-info/5 text-info shadow-info/5',
  warn: 'from-warn/10 to-warn/5 text-warn shadow-warn/10',
  error: 'from-error/10 to-error/5 text-error shadow-error/10',
}

export function StatCard({ title, value, icon: Icon, accent = 'default' }: StatCardProps) {
  return (
    <Card className="group hover:-translate-y-0.5 hover:border-white/10 hover:shadow-accent-purple/5">
      <CardContent className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-text-muted">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-text">
            {formatNumber(value)}
          </p>
        </div>
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-all duration-200 group-hover:shadow-xl',
            accentStyles[accent]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  )
}
