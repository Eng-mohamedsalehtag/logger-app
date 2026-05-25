import { Activity } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        <Link to="/login" className="mb-10 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-text">Observify</span>
        </Link>
        <Outlet />
      </div>
      <div className="relative hidden overflow-hidden lg:block lg:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-elevated via-bg to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-purple/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent-blue/15 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative flex h-full flex-col items-center justify-center p-16">
          <div className="max-w-md space-y-6 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-surface/50 backdrop-blur glow-accent">
              <Activity className="h-12 w-12 text-accent-purple" />
            </div>
            <h2 className="text-2xl font-bold text-text">
              Monitor every log. Ship with confidence.
            </h2>
            <p className="text-text-muted">
              Real-time logging, analytics, and alerting built for backend engineers.
              Debug faster with structured insights across all your applications.
            </p>
            <div className="flex justify-center gap-3 pt-4">
              {['INFO', 'WARN', 'ERROR'].map((level) => (
                <span
                  key={level}
                  className={`rounded-md border px-3 py-1 text-xs font-semibold ${
                    level === 'INFO'
                      ? 'border-info/30 bg-info/10 text-info'
                      : level === 'WARN'
                        ? 'border-warn/30 bg-warn/10 text-warn'
                        : 'border-error/30 bg-error/10 text-error'
                  }`}
                >
                  {level}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
