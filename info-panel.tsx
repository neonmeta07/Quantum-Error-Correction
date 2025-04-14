import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function InfoPanel() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Understanding Quantum Error Correction</CardTitle>
        <CardDescription>Learn how quantum computers protect information from errors</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basics">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="codes">Error Codes</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <h3>What is Quantum Error Correction?</h3>
              <p>
                Quantum computers are extremely sensitive to their environment. Tiny disturbances can cause errors in
                quantum bits (qubits), leading to incorrect calculations. Quantum Error Correction (QEC) is a set of
                techniques that protect quantum information from these errors.
              </p>

              <h4>Why Errors Happen</h4>
              <p>
                In classical computers, bits are either 0 or 1. In quantum computers, qubits can exist in a
                superposition of both 0 and 1 simultaneously. This delicate quantum state can be disturbed by:
              </p>
              <ul>
                <li>
                  <strong>Decoherence</strong> - Quantum states breaking down due to interaction with the environment
                </li>
                <li>
                  <strong>Gate errors</strong> - Imperfections in the operations performed on qubits
                </li>
                <li>
                  <strong>Measurement errors</strong> - Mistakes when reading the state of a qubit
                </li>
              </ul>

              <h4>The No-Cloning Theorem Challenge</h4>
              <p>
                A fundamental principle of quantum mechanics is that you cannot make an exact copy of an unknown quantum
                state. This makes error correction more challenging than in classical computing, where you can simply
                make multiple copies of data.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="codes" className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <h3>Quantum Error Correction Codes</h3>

              <h4>Repetition Codes</h4>
              <p>
                The simplest form of error correction. Instead of using a single qubit to store information, multiple
                qubits are used to represent the same information. For example, instead of using one qubit to represent
                a 0 or 1, three qubits might be used:
              </p>
              <ul>
                <li>Logical 0 = |000⟩</li>
                <li>Logical 1 = |111⟩</li>
              </ul>
              <p>
                If one qubit flips due to an error (e.g., |000⟩ becomes |100⟩), a majority vote can recover the original
                state.
              </p>

              <h4>Surface Codes</h4>
              <p>
                More advanced codes that arrange qubits in a two-dimensional grid. These codes can detect and correct
                both bit-flip and phase-flip errors, making them more robust for quantum computing.
              </p>

              <h4>Hamming Codes</h4>
              <p>
                These codes use additional parity qubits to detect and correct errors. They're efficient for correcting
                single-qubit errors and can be extended to handle multiple errors.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <h3>Real-World Applications</h3>

              <h4>Quantum Computing</h4>
              <p>
                Error correction is essential for building practical quantum computers that can run complex algorithms.
                Without it, quantum computers would be too error-prone for useful calculations.
              </p>

              <h4>Quantum Communication</h4>
              <p>
                When transmitting quantum information over long distances, error correction helps maintain the integrity
                of the quantum states, enabling secure quantum communication protocols.
              </p>

              <h4>Quantum Memory</h4>
              <p>
                Storing quantum information for extended periods requires error correction to prevent the quantum state
                from degrading over time.
              </p>

              <h4>Future Prospects</h4>
              <p>
                As quantum technologies advance, more sophisticated error correction techniques will be developed,
                potentially leading to fault-tolerant quantum computing that can perform reliable calculations despite
                the presence of errors.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

