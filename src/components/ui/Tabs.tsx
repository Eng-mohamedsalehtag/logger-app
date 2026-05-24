import { cn } from '@/lib/utils'

interface TabsProps {
  tabs: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 rounded-lg border border-border bg-surface/50 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            'rounded-md px-4 py-2 text-sm font-medium transition-all duration-200',
            active === tab.id
              ? 'bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 text-text shadow-sm shadow-accent-purple/10'
              : 'text-text-muted hover:text-text'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
