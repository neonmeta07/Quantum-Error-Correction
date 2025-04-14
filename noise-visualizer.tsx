import { Progress } from "@/components/ui/progress"

interface NoiseVisualizerProps {
  original: string
  noisy: string
}

export function NoiseVisualizer({ original, noisy }: NoiseVisualizerProps) {
  // Calculate error positions
  const errorPositions = []
  const minLength = Math.min(original.length, noisy.length)

  for (let i = 0; i < minLength; i++) {
    if (original[i] !== noisy[i]) {
      errorPositions.push(i)
    }
  }

  const errorRate = (errorPositions.length / minLength) * 100

  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Error Rate</span>
          <span className="text-sm font-medium">{errorRate.toFixed(1)}%</span>
        </div>
        <Progress value={errorRate} className="h-2" />
      </div>

      <div className="relative overflow-x-auto">
        <div className="font-mono text-xs whitespace-nowrap">
          {Array.from({ length: minLength }).map((_, i) => (
            <span
              key={i}
              className={`inline-block w-6 text-center py-1 ${
                errorPositions.includes(i)
                  ? "bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-200"
                  : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
              }`}
            >
              {i % 5 === 0 ? i : ""}
            </span>
          ))}
        </div>

        <div className="font-mono text-xs whitespace-nowrap">
          {Array.from({ length: minLength }).map((_, i) => (
            <span
              key={i}
              className={`inline-block w-6 text-center py-1 ${
                errorPositions.includes(i) ? "bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-200" : ""
              }`}
            >
              {original[i]}
            </span>
          ))}
        </div>

        <div className="font-mono text-xs whitespace-nowrap">
          {Array.from({ length: minLength }).map((_, i) => (
            <span
              key={i}
              className={`inline-block w-6 text-center py-1 ${
                errorPositions.includes(i)
                  ? "bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-200 font-bold"
                  : ""
              }`}
            >
              {noisy[i]}
            </span>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        <span className="inline-block w-3 h-3 bg-red-200 dark:bg-red-900/50 mr-1"></span> Error positions
        <span className="inline-block w-3 h-3 bg-green-100 dark:bg-green-900/30 ml-3 mr-1"></span> Correct positions
      </div>
    </div>
  )
}

