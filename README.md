What is Quantum Error Correction?
Quantum computers are extremely sensitive to their environment. Tiny disturbances can cause errors in quantum bits (qubits), leading to incorrect calculations. Quantum Error Correction (QEC) is a set of techniques that protect quantum information from these errors.

Why Errors Happen
In classical computers, bits are either 0 or 1. In quantum computers, qubits can exist in a superposition of both 0 and 1 simultaneously. This delicate quantum state can be disturbed by:

Decoherence - Quantum states breaking down due to interaction with the environment
Gate errors - Imperfections in the operations performed on qubits
Measurement errors - Mistakes when reading the state of a qubit
The No-Cloning Theorem Challenge
A fundamental principle of quantum mechanics is that you cannot make an exact copy of an unknown quantum state. This makes error correction more challenging than in classical computing, where you can simply make multiple copies of data.

Repetition Codes
The simplest form of error correction. Instead of using a single qubit to store information, multiple qubits are used to represent the same information. For example, instead of using one qubit to represent a 0 or 1, three qubits might be used:

Logical 0 = |000⟩
Logical 1 = |111⟩
If one qubit flips due to an error (e.g., |000⟩ becomes |100⟩), a majority vote can recover the original state.

Surface Codes
