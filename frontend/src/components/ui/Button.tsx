import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 focus:ring-offset-bg',
        'disabled:pointer-events-none disabled:opacity-50',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        variant === 'primary' &&
          'bg-gradient-to-r from-accent-purple to-accent-blue text-white shadow-lg shadow-accent-purple/25 hover:shadow-accent-purple/40 hover:-translate-y-0.5',
        variant === 'secondary' &&
          'border border-border bg-surface text-text hover:bg-surface-hover hover:border-white/10',
        variant === 'ghost' && 'text-text-muted hover:bg-surface hover:text-text',
        variant === 'danger' &&
          'bg-error/15 text-error border border-error/30 hover:bg-error/25',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
