import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

export function SearchInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
      <input
        className={cn(
          'w-full rounded-lg border border-border bg-surface py-2 pl-10 pr-4 text-sm text-text',
          'placeholder:text-text-muted/60 transition-all duration-200',
          'focus:border-accent-purple/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/20'
        )}
        {...props}
      />
    </div>
  )
}
