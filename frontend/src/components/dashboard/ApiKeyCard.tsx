import { Eye, EyeOff, KeyRound, Shield } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { Skeleton } from '@/components/ui/Skeleton'
import { useToast } from '@/components/ui/Toast'

interface ApiKeyCardProps {
  apiKey: string
  loading?: boolean
}

export function ApiKeyCard({ apiKey, loading }: ApiKeyCardProps) {
  const [revealed, setRevealed] = useState(false)
  const { showToast } = useToast()

  const masked = apiKey
    ? `obs_${'•'.repeat(24)}`
    : 'obs_••••••••••••••••••••••••'
  const display = revealed && apiKey ? apiKey : masked

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="mt-4 h-10 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-accent-purple/20 glow-accent">
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-purple/15">
              <KeyRound className="h-5 w-5 text-accent-purple" />
            </div>
            <div>
              <h3 className="font-semibold text-text">API Key</h3>
              <p className="flex items-center gap-1 text-xs text-text-muted">
                <Shield className="h-3 w-3" />
                Keep this secret — do not share publicly
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setRevealed(!revealed)}
              className="rounded-lg border border-border p-2 text-text-muted transition-colors hover:bg-surface-hover hover:text-text"
              aria-label={revealed ? 'Hide API key' : 'Reveal API key'}
            >
              {revealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            <CopyButton
              value={apiKey}
              onCopied={() => showToast('API key copied to clipboard')}
            />
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-border bg-bg-elevated px-4 py-3 font-mono text-sm tracking-wide text-text">
          {display}
        </div>
      </CardContent>
    </Card>
  )
}
