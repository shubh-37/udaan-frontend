"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"

export function InterviewSummary({ isUnlocked }) {
  const questions = [
    {
      question: "Explain the concept of recursion and provide an example.",
      answer:
        "Recursion is when a function calls itself. For example, calculating factorial using recursion would involve multiplying a number by factorial of (n-1).",
      analysis:
        "The explanation was basic but correct. Could have provided more details about base cases and stack implications.",
      correctParts: ["basic definition", "factorial example"],
      incorrectParts: ["missing base case explanation", "no mention of stack overflow considerations"],
    },
    {
      question: "What are the benefits of using TypeScript over JavaScript?",
      answer: "TypeScript adds type safety and better IDE support. It helps catch errors during development.",
      analysis:
        "Good mention of key benefits but could have elaborated on interface support and other advanced features.",
      correctParts: ["type safety", "IDE support"],
      incorrectParts: ["no mention of interfaces", "missing compile-time checking benefits"],
    },
  ]

  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <CardTitle>Question-by-Question Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <AnimatePresence>
          {!isUnlocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-sm bg-gray-100/80 z-10"
            >
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Lock className="w-12 h-12 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Pay to unlock this detailed review</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Unlock interview transcripts, correct solutions, and tips on how to answer each question.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`space-y-6 ${!isUnlocked && "blur-sm"}`}>
          {questions.map((q, i) => (
            <div key={i} className="space-y-3">
              <h3 className="font-semibold">Question {i + 1}:</h3>
              <p className="text-sm">{q.question}</p>
              <div className="pl-4 border-l-2 border-muted">
                <p className="text-sm">Your Answer:</p>
                <p className="text-sm text-muted-foreground">{q.answer}</p>
              </div>
              <div className="pl-4 border-l-2 border-primary">
                <p className="text-sm">Analysis:</p>
                <p className="text-sm text-muted-foreground">{q.analysis}</p>
                <div className="mt-2 space-y-2">
                  <div>
                    <span className="text-sm font-medium text-green-500">Correct parts: </span>
                    <span className="text-sm">{q.correctParts.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-red-500">Areas to improve: </span>
                    <span className="text-sm">{q.incorrectParts.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
