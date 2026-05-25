import type { LogEntry } from '@/types/log'

const messages: Record<string, string[]> = {
  INFO: [
    'Request processed successfully',
    'User session established',
    'Cache hit for key user:profile:8821',
    'Health check passed — all dependencies up',
    'Webhook delivered to partner endpoint',
    'Database connection pool warmed',
    'Background job completed: sync-inventory',
    'Rate limit bucket reset for client 10.0.0.42',
  ],
  WARN: [
    'Slow query detected (> 800ms) on orders table',
    'Retry attempt 2/3 for external API call',
    'Memory usage above 75% threshold',
    'Deprecated API version v1 still in use',
    'Certificate expires in 14 days',
    'Queue backlog growing: 1,240 pending messages',
    'Stale session token refreshed automatically',
  ],
  ERROR: [
    'Payment gateway timeout after 30s',
    'Unhandled exception: NullReference in OrderService',
    'Failed to connect to Redis cluster node-2',
    'JWT validation failed: signature mismatch',
    'Disk write error on /var/log partition',
    'Circuit breaker opened for inventory-service',
    'Duplicate key violation on users.email',
  ],
}

function generateLogs(): LogEntry[] {
  const apps = ['app-1', 'app-2', 'app-3', 'app-4', 'app-5']
  const entries: LogEntry[] = []
  let id = 1
  const now = new Date('2026-05-21T12:00:00.000Z')

  for (const appId of apps) {
    const countPerApp = appId === 'app-5' ? 30 : appId === 'app-1' ? 28 : 24
    for (let i = 0; i < countPerApp; i++) {
      const levelWeights = ['INFO', 'INFO', 'INFO', 'WARN', 'WARN', 'ERROR'] as const
      const levelKey = levelWeights[i % levelWeights.length]
      const levelMsgs = messages[levelKey]
      const msg = levelMsgs[i % levelMsgs.length]
      const daysAgo = Math.floor(i / 3)
      const hoursOffset = (i * 7) % 24
      const last = new Date(now)
      last.setDate(last.getDate() - daysAgo)
      last.setHours(last.getHours() - hoursOffset)
      const first = new Date(last)
      first.setHours(first.getHours() - Math.floor(Math.random() * 48 + 1))

      entries.push({
        id: `log-${id++}`,
        applicationId: appId,
        message: `[${appId.split('-')[0]}] ${msg}`,
        level: levelKey,
        count: Math.floor(Math.random() * 450) + 1,
        firstOccurrence: first.toISOString(),
        lastOccurrence: last.toISOString(),
      })
    }
  }

  return entries.sort(
    (a, b) => new Date(b.lastOccurrence).getTime() - new Date(a.lastOccurrence).getTime()
  )
}

export const initialLogs: LogEntry[] = generateLogs()
