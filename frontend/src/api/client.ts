import type { ApiErrorBody, ApiSuccess } from '@/api/types'

const API_URL = import.meta.env.VITE_API_URL ?? '/api'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  const body = await res.json().catch(() => ({})) as ApiSuccess<T> | ApiErrorBody

  if (!res.ok) {
    const message =
      'message' in body && body.message ? body.message : res.statusText
    throw new ApiError(message, res.status)
  }

  if ('data' in body && body.status === 'success') {
    return body.data
  }

  return body as T
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}
