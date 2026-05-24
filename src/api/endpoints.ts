export const endpoints = {
  users: {
    register: '/users',
    login: '/users/login',
    logout: '/users/logout',
    me: '/users/me',
  },
  applications: '/applications',
  application: (name: string) => `/applications/${encodeURIComponent(name)}`,
  logs: (name: string) => `/applications/${encodeURIComponent(name)}/logs`,
  analytics: {
    distribution: (name: string) =>
      `/applications/${encodeURIComponent(name)}/analytics/distribution`,
    timeseries: (name: string, days = 14) =>
      `/applications/${encodeURIComponent(name)}/analytics/timeseries?days=${days}`,
  },
  dashboard: {
    stats: '/dashboard/stats',
  },
} as const
