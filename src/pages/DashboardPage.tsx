import { ApiKeyCard } from '@/components/dashboard/ApiKeyCard'
import { ApplicationCard } from '@/components/dashboard/ApplicationCard'
import { CreateAppDialog } from '@/components/dashboard/CreateAppDialog'
import { AppLayout } from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/Button'
import { SearchInput } from '@/components/ui/SearchInput'
import { Skeleton } from '@/components/ui/Skeleton'
import { StatCard } from '@/components/ui/StatCard'
import { useToast } from '@/components/ui/Toast'
import { useAuth } from '@/context/AuthContext'
import { useApplications } from '@/hooks/useApplications'
import { useDashboardStats } from '@/hooks/useDashboardStats'
import {
  AlertTriangle,
  AppWindow,
  FileText,
  Info,
  Plus,
  ScrollText,
  XCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export function DashboardPage() {
  const { user } = useAuth()
  const { stats, apiKey, loading: statsLoading } = useDashboardStats()
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const { applications, loading: appsLoading, create, remove } = useApplications(debouncedSearch)
  const { showToast } = useToast()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  useEffect(() => {
    if (searchParams.get('section') === 'apps') {
      document.getElementById('applications-section')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [searchParams])

  const handleCreate = async (name: string) => {
    await create(name)
    showToast(`Application "${name}" created`)
  }

  const handleDelete = async (name: string) => {
    await remove(name)
    showToast('Application deleted')
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section>
          <h1 className="text-2xl font-bold text-text md:text-3xl">
            Welcome back, {user?.name?.split(' ')[0] ?? 'there'}
          </h1>
          <p className="mt-1 text-text-muted">
            Here&apos;s an overview of your logging platform
          </p>
        </section>

        <ApiKeyCard apiKey={apiKey} loading={statsLoading} />

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {statsLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))
          ) : stats ? (
            <>
              <StatCard title="Total Applications" value={stats.totalApplications} icon={AppWindow} />
              <StatCard title="Total Logs" value={stats.totalLogs} icon={ScrollText} />
              <StatCard title="INFO Logs" value={stats.infoLogs} icon={Info} accent="info" />
              <StatCard title="WARN Logs" value={stats.warnLogs} icon={AlertTriangle} accent="warn" />
              <StatCard title="ERROR Logs" value={stats.errorLogs} icon={XCircle} accent="error" />
            </>
          ) : null}
        </section>

        <section id="applications-section">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text">Applications</h2>
              <p className="text-sm text-text-muted">Manage and monitor your services</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SearchInput
                placeholder="Search applications…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="sm:w-64"
              />
              <Button onClick={() => setCreateOpen(true)}>
                <Plus className="h-4 w-4" />
                Create application
              </Button>
            </div>
          </div>

          {appsLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-36 rounded-xl" />
              ))}
            </div>
          ) : applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
              <FileText className="mb-4 h-12 w-12 text-text-muted/50" />
              <p className="font-medium text-text">No applications found</p>
              <p className="mt-1 text-sm text-text-muted">
                {search ? 'Try a different search term' : 'Create your first application to get started'}
              </p>
              {!search && (
                <Button className="mt-4" onClick={() => setCreateOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Create application
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {applications.map((app) => (
                <ApplicationCard key={app.id} application={app} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </section>
      </div>

      <CreateAppDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />
    </AppLayout>
  )
}
