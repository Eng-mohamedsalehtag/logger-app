import { apiClient } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import { mapApplication, mapApplicationDetail } from '@/api/mappers'
import type { BackendApplication } from '@/api/types'
import { mockAdapter } from '@/mock/mockAdapter'
import type { Application, ApplicationDetail } from '@/types/application'

const useMock = import.meta.env.VITE_USE_MOCK !== 'false'

export async function getApplications(search?: string): Promise<Application[]> {
  if (useMock) return mockAdapter.getApplications(search)

  const data = await apiClient.get<{ applications: BackendApplication[] }>(
    endpoints.applications
  )
  let apps = data.applications.map(mapApplication)

  if (search?.trim()) {
    const q = search.toLowerCase()
    apps = apps.filter((a) => a.name.toLowerCase().includes(q))
  }

  return apps
}

export async function createApplication(name: string): Promise<Application> {
  if (useMock) return mockAdapter.createApplication(name)

  const data = await apiClient.post<{ application: BackendApplication }>(
    endpoints.applications,
    { name: name.trim() }
  )
  return mapApplication({ ...data.application, logCount: 0 })
}

export async function deleteApplication(name: string): Promise<void> {
  if (useMock) return mockAdapter.deleteApplication(name)

  await apiClient.delete(endpoints.application(name))
}

export async function getApplicationByName(name: string): Promise<ApplicationDetail | null> {
  if (useMock) return mockAdapter.getApplicationById(name)

  try {
    const data = await apiClient.get<{ application: BackendApplication }>(
      endpoints.application(name)
    )
    return mapApplicationDetail(data.application)
  } catch {
    return null
  }
}
