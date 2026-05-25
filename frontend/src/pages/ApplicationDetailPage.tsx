import { LevelPieChart } from '@/components/charts/LevelPieChart'
import { LogsLineChart } from '@/components/charts/LogsLineChart'
import { AppLayout } from '@/components/layout/AppLayout'
import { LogFilters } from '@/components/logs/LogFilters'
import { LogsTable } from '@/components/logs/LogsTable'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { Skeleton } from '@/components/ui/Skeleton'
import { Tabs } from '@/components/ui/Tabs'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useLogs } from '@/hooks/useLogs'
import type { LogLevel } from '@/lib/utils'
import { formatDate, formatNumber, formatRelative } from '@/lib/utils'
import * as applicationService from '@/services/applicationService'
import type { ApplicationDetail } from '@/types/application'
import type { LogSort } from '@/types/log'
import { ArrowLeft, Calendar, Clock, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function ApplicationDetailPage() {
  const { name: encodedName } = useParams<{ name: string }>()
  const appName = encodedName ? decodeURIComponent(encodedName) : ''
  const [app, setApp] = useState<ApplicationDetail | null>(null)
  const [appLoading, setAppLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('logs')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [level, setLevel] = useState<LogLevel | 'ALL'>('ALL')
  const [sort, setSort] = useState<LogSort>('most_recent')
  const [page, setPage] = useState(1)

  const { data: logsData, loading: logsLoading } = useLogs(appName, {
    page,
    pageSize: 10,
    search: debouncedSearch,
    level,
    sort,
  })

  const { distribution, timeSeries, loading: analyticsLoading } = useAnalytics(
    activeTab === 'analytics' ? appName : ''
  )

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(t)
  }, [search])

  useEffect(() => {
    if (!appName) return
    let ignore = false
    Promise.resolve().then(() => {
      if (!ignore) {
        setAppLoading(true)
      }
    })
    applicationService.getApplicationByName(appName).then((data) => {
      if (!ignore) {
        setApp(data)
        setAppLoading(false)
      }
    })
    return () => {
      ignore = true
    }
  }, [appName])

  if (appLoading) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-7xl space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </AppLayout>
    )
  }

  if (!app) {
    return (
      <AppLayout title="Application not found">
        <div className="mx-auto max-w-7xl text-center py-16">
          <p className="text-text-muted">Application not found</p>
          <Link to="/" className="mt-4 inline-block text-accent-purple hover:underline">
            Back to dashboard
          </Link>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout title={app.name}>
      <div className="mx-auto max-w-7xl space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <Card>
          <CardContent className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text">{app.name}</h1>
              <div className="mt-4 flex flex-wrap gap-6 text-sm text-text-muted">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Created {formatDate(app.createdAt)}
                </span>
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-info" />
                  {formatNumber(app.logCount)} total logs
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Last activity{' '}
                  {app.lastActivity ? formatRelative(app.lastActivity) : '—'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs
          tabs={[
            { id: 'logs', label: 'Logs Table' },
            { id: 'analytics', label: 'Analytics Charts' },
          ]}
          active={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === 'logs' && (
          <div className="space-y-6">
            <LogFilters
              search={search}
              onSearchChange={setSearch}
              level={level}
              onLevelChange={(l) => {
                setLevel(l)
                setPage(1)
              }}
              sort={sort}
              onSortChange={(s) => {
                setSort(s)
                setPage(1)
              }}
            />
            <LogsTable logs={logsData?.items ?? []} loading={logsLoading} />
            {logsData && logsData.totalPages > 0 && (
              <Pagination
                page={logsData.page}
                totalPages={logsData.totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-text">Log level distribution</h3>
                <p className="text-sm text-text-muted">Ratio of INFO / WARN / ERROR</p>
              </CardHeader>
              <CardContent>
                <LevelPieChart data={distribution} loading={analyticsLoading} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader>
                <h3 className="font-semibold text-text">Logs over time</h3>
                <p className="text-sm text-text-muted">Daily count by level (last 14 days)</p>
              </CardHeader>
              <CardContent className="min-w-0">
                <LogsLineChart data={timeSeries} loading={analyticsLoading} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
