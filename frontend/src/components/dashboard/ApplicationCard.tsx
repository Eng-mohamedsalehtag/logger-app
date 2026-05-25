import type { Application } from '@/types/application'
import { formatDate, formatNumber } from '@/lib/utils'
import { Calendar, FileText, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface ApplicationCardProps {
  application: Application
  onDelete: (name: string) => void
}

export function ApplicationCard({ application, onDelete }: ApplicationCardProps) {
  const navigate = useNavigate()

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm(`Delete "${application.name}"? This cannot be undone.`)) {
      onDelete(application.name)
    }
  }

  return (
    <Card
      className="cursor-pointer hover:-translate-y-0.5 hover:border-accent-purple/30 hover:shadow-accent-purple/10"
      onClick={() => navigate(`/applications/${encodeURIComponent(application.name)}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        e.key === 'Enter' &&
        navigate(`/applications/${encodeURIComponent(application.name)}`)
      }
    >
      <CardContent>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-text truncate">{application.name}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            aria-label={`Delete ${application.name}`}
            className="shrink-0 text-text-muted hover:text-error"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 space-y-2 text-sm text-text-muted">
          <p className="flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0" />
            {formatDate(application.createdAt)}
          </p>
          <p className="flex items-center gap-2">
            <FileText className="h-4 w-4 shrink-0 text-info" />
            <span>
              <span className="font-medium text-text">{formatNumber(application.logCount)}</span>{' '}
              logs
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
