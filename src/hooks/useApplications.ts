import { useCallback, useEffect, useState } from 'react'
import type { Application } from '@/types/application'
import * as applicationService from '@/services/applicationService'

export function useApplications(search?: string) {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await applicationService.getApplications(search)
      setApplications(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load applications')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    refresh()
  }, [refresh])

  const create = async (name: string) => {
    const app = await applicationService.createApplication(name)
    await refresh()
    return app
  }

  const remove = async (name: string) => {
    await applicationService.deleteApplication(name)
    await refresh()
  }

  return { applications, loading, error, refresh, create, remove }
}
