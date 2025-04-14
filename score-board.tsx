import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Star, TrendingUp } from "lucide-react"

interface ScoreBoardProps {
  score: number
}

export function ScoreBoard({ score }: ScoreBoardProps) {
  // Calculate level based on score
  const level = Math.floor(score / 500) + 1
  const nextLevelScore = level * 500
  const progress = ((score % 500) / 500) * 100

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
          <h3 className="font-medium">Your Score</h3>
        </div>
        <span className="text-2xl font-bold">{score}</span>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-purple-500 mr-1" />
              <span className="text-sm font-medium">Quantum Level</span>
            </div>
            <span className="text-lg font-bold">{level}</span>
          </div>

          <div className="w-full bg-muted rounded-full h-2.5 mb-1">
            <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{score % 500} points</span>
            <span>{nextLevelScore} points</span>
          </div>

          <div className="mt-3 flex items-center text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>{nextLevelScore - score} points until next level</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

