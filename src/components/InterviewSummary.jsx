"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Lock } from "lucide-react"

export function InterviewSummary({ isPremium , questionAnalysis = [] }) {
  const dummyQuestions = [
    {
      question: "Explain the concept of recursion and provide an example.",
      answer: "Recursion is when a function calls itself. For example, calculating factorial using recursion would involve multiplying a number by factorial of (n-1).",
      analysis: "The explanation was basic but correct. Could have provided more details about base cases and stack implications.",
      responseAnalysis: { timeSpent: "3:20 mins", confidenceLevel: "80%" },
      speechAnalysis: { clarity: "90%", speakingRate: "130 WPM", technicalTerms: "10 used" },
    },
    {
      question: "What are the benefits of using TypeScript over JavaScript?",
      answer: "TypeScript adds type safety and better IDE support. It helps catch errors during development.",
      analysis: "Good mention of key benefits but could have elaborated on interface support and other advanced features.",
      responseAnalysis: { timeSpent: "2:45 mins", confidenceLevel: "85%" },
      speechAnalysis: { clarity: "92%", speakingRate: "140 WPM", technicalTerms: "12 used" },
    },
  ];

  const questionsToShow = isPremium ? questionAnalysis : dummyQuestions;

  return (
    <Card className="relative overflow-hidden">
      <CardContent className={`space-y-6 overflow-y-auto ${!isPremium ? 'max-h-[300px] sm:max-h-[400px] md:max-h-[500px]' : ''}`}>
        <AnimatePresence>
          {!isPremium && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-sm bg-card/80 z-10"
            >
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Lock className="w-12 h-12 text-muted-foreground" />
                <h3 className="text-xl font-semibold text-center p-2">Pay to unlock this detailed review</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md px-2">
                  Unlock interview transcripts, correct solutions, and tips on how to answer each question.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`space-y-6 ${!isPremium && "blur-sm"} pt-6`}>
          {questionsToShow.map((q, i) => (
            <div key={i} className="space-y-4 p-4 bg-card text-card-foreground border rounded-md">
              <h3 className="font-semibold text-orange-400">Question {i + 1}: {q.question}</h3>
              <p className="text-sm text-card-foreground">Answer:</p>
              <p className="text-sm text-card-foreground bg-card p-2 rounded">{q.answer}</p>
              <div className="border-l-4 border-green-500 pl-4 bg-gray-100 dark:bg-gray-900 rounded-md p-4">
                <p className="text-sm text-green-400">Details:</p>
                <p className="text-sm text-card-foreground">{q.quick_analysis}</p>
              </div>

              {/* Response & Speech Analysis */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg">
                  <h4 className="text-green-400 font-medium">Response Analysis</h4>
                  <p className="text-sm">Time Spent: {q.time_seconds}</p>
                  <p className="text-sm">Confidence Level: {q.confidenceLevel}</p>
                  <p className="text-sm">Filler Words: {q.fillerWords?.join(', ')}</p>
                </div>
                <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg">
                  <h4 className="text-purple-400 font-medium">Speech Analysis</h4>
                  <p className="text-sm">Clarity: {q.clarity_score}</p>
                  <p className="text-sm">Speaking Rate: {q.confidence_score}</p>
                  <p className="text-sm">Technical Terms: {q.fluency_score}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
