import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(iso: string): string {
  return format(new Date(iso), 'MMM d, yyyy HH:mm')
}

export function formatRelative(iso: string): string {
  return formatDistanceToNow(new Date(iso), { addSuffix: true })
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n)
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const LOG_LEVELS = ['INFO', 'WARN', 'ERROR'] as const
export type LogLevel = (typeof LOG_LEVELS)[number]

export function levelColor(level: LogLevel): string {
  switch (level) {
    case 'INFO':
      return 'text-info bg-info/15 border-info/30'
    case 'WARN':
      return 'text-warn bg-warn/15 border-warn/30'
    case 'ERROR':
      return 'text-error bg-error/15 border-error/30'
  }
}
