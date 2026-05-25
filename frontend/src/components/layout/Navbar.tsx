import { Bell } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { SidebarToggle } from './Sidebar'

interface NavbarProps {
  onMenuClick: () => void
  title?: string
}

export function Navbar({ onMenuClick, title }: NavbarProps) {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-bg/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <SidebarToggle onClick={onMenuClick} />
        {title && <h1 className="text-lg font-semibold text-text">{title}</h1>}
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface hover:text-text"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent-purple to-accent-blue text-sm font-semibold text-white">
            {user?.name?.charAt(0) ?? 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-text">{user?.name}</p>
            <p className="text-xs text-text-muted">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
