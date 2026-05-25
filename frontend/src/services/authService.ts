import { apiClient } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import { mapDeveloper } from '@/api/mappers'
import type { BackendDeveloper } from '@/api/types'
import { mockAdapter } from '@/mock/mockAdapter'
import type { AuthResponse, LoginCredentials, RegisterCredentials, User } from '@/types/auth'

const useMock = import.meta.env.VITE_USE_MOCK !== 'false'

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  if (useMock) return mockAdapter.login(credentials)

  const data = await apiClient.post<{ developer: BackendDeveloper }>(
    endpoints.users.login,
    credentials
  )
  return { token: '', user: mapDeveloper(data.developer) }
}

export async function register(data: RegisterCredentials): Promise<AuthResponse> {
  if (useMock) return mockAdapter.register(data)

  const res = await apiClient.post<{ developer: BackendDeveloper }>(
    endpoints.users.register,
    { username: data.name.trim(), email: data.email, password: data.password }
  )
  return { token: '', user: mapDeveloper(res.developer) }
}

export async function logout(): Promise<void> {
  if (useMock) return
  await apiClient.post(endpoints.users.logout)
}

export async function getCurrentUser(): Promise<User | null> {
  if (useMock) return null

  try {
    const data = await apiClient.get<{ developer: BackendDeveloper }>(endpoints.users.me)
    return mapDeveloper(data.developer)
  } catch {
    return null
  }
}

export async function getApiKey(): Promise<string> {
  if (useMock) return mockAdapter.getApiKey()

  const data = await apiClient.get<{ developer: BackendDeveloper }>(endpoints.users.me)
  return data.developer.apiKey
}
