import { cn } from '@/lib/utils'
import {
  Activity,
  BarChart3,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/?section=apps', label: 'Applications', icon: Activity, end: false },
  { to: '/logs', label: 'Logs', icon: FileText, end: false },
  { to: '/analytics', label: 'Analytics', icon: BarChart3, end: false },
  { to: '/settings', label: 'Settings', icon: Settings, end: false },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border bg-surface/95 backdrop-blur-xl transition-transform duration-200 lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-text">Observify</span>
          </div>
          <button
            type="button"
            className="lg:hidden text-text-muted hover:text-text"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive && to === '/'
                    ? 'border-l-2 border-accent-purple bg-accent-purple/10 text-text shadow-sm shadow-accent-purple/10'
                    : 'text-text-muted hover:bg-surface-hover hover:text-text'
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-border p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-error/10 hover:text-error"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="rounded-lg p-2 text-text-muted hover:bg-surface hover:text-text lg:hidden"
      onClick={onClick}
      aria-label="Open menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}
