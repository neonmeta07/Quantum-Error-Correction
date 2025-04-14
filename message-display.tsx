import { Card } from "@/components/ui/card"

interface MessageDisplayProps {
  original: string
  corrupted: string
  corrected?: string
}

export function MessageDisplay({ original, corrupted, corrected }: MessageDisplayProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 border-green-200 bg-green-50 dark:bg-green-950/20">
          <h3 className="text-sm font-medium mb-2 text-green-700 dark:text-green-400">Original Message</h3>
          <p className="font-mono break-all">{original}</p>
        </Card>

        <Card className="p-4 border-red-200 bg-red-50 dark:bg-red-950/20">
          <h3 className="text-sm font-medium mb-2 text-red-700 dark:text-red-400">Noisy Message</h3>
          <p className="font-mono break-all">{corrupted}</p>
        </Card>
      </div>

      {corrected && (
        <Card className="p-4 border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <h3 className="text-sm font-medium mb-2 text-blue-700 dark:text-blue-400">Corrected Message</h3>
          <p className="font-mono break-all">{corrected}</p>
          <div className="mt-2">
            <CompareMessages original={original} corrected={corrected} />
          </div>
        </Card>
      )}
    </div>
  )
}

function CompareMessages({ original, corrected }: { original: string; corrected: string }) {
  const maxLength = Math.max(original.length, corrected.length)
  const characters = []

  for (let i = 0; i < maxLength; i++) {
    const originalChar = original[i] || ""
    const correctedChar = corrected[i] || ""
    const isMatch = originalChar === correctedChar

    characters.push(
      <span key={i} className={`inline-block ${isMatch ? "text-green-600" : "text-red-600 font-bold"}`}>
        {correctedChar}
      </span>,
    )
  }

  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">Character comparison:</p>
      <div className="font-mono">{characters}</div>
    </div>
  )
}

