import type { Application } from '@/types/application'

export const initialApplications: Application[] = [
  {
    id: 'app-1',
    name: 'api-gateway',
    createdAt: '2025-11-12T09:15:00.000Z',
    logCount: 342,
  },
  {
    id: 'app-2',
    name: 'payment-service',
    createdAt: '2025-12-03T14:22:00.000Z',
    logCount: 218,
  },
  {
    id: 'app-3',
    name: 'auth-worker',
    createdAt: '2026-01-08T11:00:00.000Z',
    logCount: 156,
  },
  {
    id: 'app-4',
    name: 'notification-hub',
    createdAt: '2026-02-14T16:45:00.000Z',
    logCount: 89,
  },
  {
    id: 'app-5',
    name: 'analytics-collector',
    createdAt: '2026-03-01T08:30:00.000Z',
    logCount: 412,
  },
]
