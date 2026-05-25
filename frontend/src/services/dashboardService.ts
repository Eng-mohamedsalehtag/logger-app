import { apiClient } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import { mockAdapter } from '@/mock/mockAdapter'
import * as authService from '@/services/authService'
import type { DashboardStats } from '@/types/dashboard'

const useMock = import.meta.env.VITE_USE_MOCK !== 'false'

export async function getDashboardStats(): Promise<DashboardStats> {
  if (useMock) return mockAdapter.getDashboardStats()

  const data = await apiClient.get<{ stats: DashboardStats }>(endpoints.dashboard.stats)
  return data.stats
}

export async function getApiKey(): Promise<string> {
  if (useMock) return mockAdapter.getApiKey()
  return authService.getApiKey()
}
