"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { simulateQuantumNoise, applyErrorCorrection } from "@/lib/quantum-utils"
import { MessageDisplay } from "@/components/message-display"
import { NoiseVisualizer } from "@/components/noise-visualizer"
import { ScoreBoard } from "@/components/score-board"
import { InfoPanel } from "@/components/info-panel"
import { QuantumBits } from "@/components/quantum-bits"
import { AlertCircle, Award, Zap } from "lucide-react"

export default function QuantumErrorSimulator() {
  const [originalMessage, setOriginalMessage] = useState("")
  const [noisyMessage, setNoisyMessage] = useState("")
  const [correctedMessage, setCorrectedMessage] = useState("")
  const [noiseLevel, setNoiseLevel] = useState(30)
  const [score, setScore] = useState(0)
  const [gameMode, setGameMode] = useState("practice")
  const [showBits, setShowBits] = useState(false)
  const [currentStep, setCurrentStep] = useState("input")
  const [correctionMethod, setCorrectionMethod] = useState("repetition")

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOriginalMessage(e.target.value)
    setNoisyMessage("")
    setCorrectedMessage("")
    setCurrentStep("input")
  }

  const applyNoise = () => {
    if (!originalMessage) return

    const noisy = simulateQuantumNoise(originalMessage, noiseLevel / 100)
    setNoisyMessage(noisy)
    setCorrectedMessage("")
    setCurrentStep("noisy")
    setShowBits(true)
  }

  const correctErrors = () => {
    if (!noisyMessage) return

    const corrected = applyErrorCorrection(noisyMessage, originalMessage, correctionMethod)
    setCorrectedMessage(corrected)
    setCurrentStep("corrected")

    // Calculate score based on correction accuracy
    const accuracy = calculateAccuracy(originalMessage, corrected)
    const newPoints = Math.floor(accuracy * 100 * (noiseLevel / 20))
    setScore((prevScore) => prevScore + newPoints)
  }

  const calculateAccuracy = (original: string, corrected: string) => {
    let matches = 0
    const length = Math.min(original.length, corrected.length)

    for (let i = 0; i < length; i++) {
      if (original[i] === corrected[i]) matches++
    }

    return length > 0 ? matches / length : 0
  }

  const resetSimulation = () => {
    setNoisyMessage("")
    setCorrectedMessage("")
    setCurrentStep("input")
    setShowBits(false)
  }

  const startChallenge = () => {
    setGameMode("challenge")
    setScore(0)
    resetSimulation()
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-center mb-2">Quantum Error Correction Simulator</h1>
        <p className="text-lg text-center text-muted-foreground max-w-2xl">
          Experience how quantum computers protect information from errors through error correction codes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="simulator" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="simulator">Simulator</TabsTrigger>
              <TabsTrigger value="learn">Learn</TabsTrigger>
            </TabsList>

            <TabsContent value="simulator" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Message Input</span>
                    <Badge variant={gameMode === "challenge" ? "destructive" : "outline"}>
                      {gameMode === "challenge" ? "Challenge Mode" : "Practice Mode"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>Enter a message to protect with quantum error correction</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Type your message here..."
                    className="min-h-[100px]"
                    value={originalMessage}
                    onChange={handleMessageChange}
                  />

                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Noise Level: {noiseLevel}%</label>
                        <div className="flex items-center text-sm">
                          <span className="mr-2">Low</span>
                          <Zap size={16} className="text-yellow-500" />
                          <span className="ml-2">High</span>
                        </div>
                      </div>
                      <Slider
                        value={[noiseLevel]}
                        min={10}
                        max={80}
                        step={5}
                        onValueChange={(value) => setNoiseLevel(value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Error Correction Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={correctionMethod === "repetition" ? "default" : "outline"}
                          onClick={() => setCorrectionMethod("repetition")}
                          className="justify-start"
                        >
                          Repetition Code
                        </Button>
                        <Button
                          variant={correctionMethod === "hamming" ? "default" : "outline"}
                          onClick={() => setCorrectionMethod("hamming")}
                          className="justify-start"
                        >
                          Hamming Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={resetSimulation}>
                    Reset
                  </Button>
                  <Button onClick={applyNoise} disabled={!originalMessage}>
                    Apply Quantum Noise
                  </Button>
                </CardFooter>
              </Card>

              {noisyMessage && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertCircle className="mr-2 h-5 w-5 text-destructive" />
                      Noisy Quantum State
                    </CardTitle>
                    <CardDescription>Your message has been affected by quantum decoherence</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MessageDisplay original={originalMessage} corrupted={noisyMessage} />

                    {showBits && (
                      <div className="mt-4">
                        <NoiseVisualizer original={originalMessage} noisy={noisyMessage} />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={correctErrors} disabled={!noisyMessage}>
                      Apply Error Correction
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {correctedMessage && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-green-500" />
                      Error Correction Results
                    </CardTitle>
                    <CardDescription>See how well the quantum error correction performed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <MessageDisplay
                        original={originalMessage}
                        corrupted={noisyMessage}
                        corrected={correctedMessage}
                      />

                      <div className="bg-muted p-4 rounded-md">
                        <h3 className="font-medium mb-2">Correction Statistics</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Accuracy</p>
                            <p className="text-xl font-bold">
                              {Math.round(calculateAccuracy(originalMessage, correctedMessage) * 100)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Points Earned</p>
                            <p className="text-xl font-bold text-green-500">
                              +
                              {Math.floor(
                                calculateAccuracy(originalMessage, correctedMessage) * 100 * (noiseLevel / 20),
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={resetSimulation}>
                      Try Again
                    </Button>
                    <Button
                      onClick={() => {
                        setOriginalMessage("")
                        resetSimulation()
                      }}
                    >
                      New Message
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="learn">
              <InfoPanel />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quantum Dashboard</CardTitle>
              <CardDescription>Track your progress and learn about quantum bits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ScoreBoard score={score} />

              {showBits && (
                <QuantumBits
                  message={originalMessage}
                  noisy={noisyMessage}
                  corrected={correctedMessage}
                  currentStep={currentStep}
                />
              )}

              <div className="space-y-2">
                <h3 className="font-medium">Game Modes</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={gameMode === "practice" ? "default" : "outline"}
                    onClick={() => setGameMode("practice")}
                    className="justify-start"
                  >
                    Practice Mode
                  </Button>
                  <Button
                    variant={gameMode === "challenge" ? "destructive" : "outline"}
                    onClick={startChallenge}
                    className="justify-start"
                  >
                    Challenge Mode
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {gameMode === "challenge"
                    ? "Challenge: Correct messages with increasing noise levels"
                    : "Practice: Experiment with different messages and noise levels"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

