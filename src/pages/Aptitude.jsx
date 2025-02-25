"use client"

import { useState } from "react"
import ConfigModal from "@/components/ConfigModal"
import ExamSelection from "@/components/ExamSelection"
import ExamInterface from "@/components/ExamInterface"
import ResultPage from "@/components/ResultPage"
import { motion, AnimatePresence } from "framer-motion"

export default function App() {
  const [step, setStep] = useState("config") // config, selection, exam, result
  const [examConfig, setExamConfig] = useState(null)
  const [examType, setExamType] = useState(null)
  const [answers, setAnswers] = useState({})

  const handleConfigSubmit = (config) => {
    setExamConfig(config)
    setStep("selection")
  }

  const handleExamStart = (type) => {
    setExamType(type)
    setStep("exam")
  }

  const handleExamComplete = (finalAnswers) => {
    setAnswers(finalAnswers)
    setStep("result")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AnimatePresence mode="wait">
        {step === "config" && (
          <motion.div
            key="config"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ConfigModal onSubmit={handleConfigSubmit} />
          </motion.div>
        )}

        {step === "selection" && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ExamSelection onStart={handleExamStart} config={examConfig} />
          </motion.div>
        )}

        {step === "exam" && (
          <motion.div
            key="exam"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ExamInterface config={examConfig} examType={examType} onComplete={handleExamComplete} />
          </motion.div>
        )}

        {step === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ResultPage answers={answers} examType={examType} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}