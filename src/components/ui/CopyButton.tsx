import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Button } from './Button'

interface CopyButtonProps {
  value: string
  onCopied?: () => void
}

export function CopyButton({ value, onCopied }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      onCopied?.()
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <Button variant="secondary" size="sm" onClick={handleCopy} type="button">
      {copied ? (
        <>
          <Check className="h-4 w-4 text-info" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy
        </>
      )}
    </Button>
  )
}
