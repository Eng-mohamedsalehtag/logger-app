import { AppLayout } from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

interface PlaceholderPageProps {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <AppLayout title={title}>
      <div className="mx-auto max-w-lg rounded-xl border border-dashed border-border py-16 text-center">
        <h2 className="text-lg font-semibold text-text">{title}</h2>
        <p className="mt-2 text-sm text-text-muted">{description}</p>
        <Link to="/">
          <Button className="mt-6" variant="secondary">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </AppLayout>
  )
}
