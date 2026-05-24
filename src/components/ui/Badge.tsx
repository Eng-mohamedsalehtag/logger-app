import { cn, levelColor, type LogLevel } from '@/lib/utils'

interface BadgeProps {
  level: LogLevel
  className?: string
}

export function Badge({ level, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide',
        levelColor(level),
        className
      )}
    >
      {level}
    </span>
  )
}
