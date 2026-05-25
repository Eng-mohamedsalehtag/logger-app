import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

interface CreateAppDialogProps {
  open: boolean
  onClose: () => void
  onCreate: (name: string) => Promise<void>
}

export function CreateAppDialog({ open, onClose, onCreate }: CreateAppDialogProps) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Application name is required')
      return
    }
    setLoading(true)
    setError('')
    try {
      await onCreate(name.trim())
      setName('')
      onClose()
    } catch {
      setError('Failed to create application')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Create application">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Application name"
          placeholder="e.g. payment-service"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating…' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
