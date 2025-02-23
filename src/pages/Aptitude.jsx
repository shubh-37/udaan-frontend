"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { BookmarkIcon, Clock, AlertTriangle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

// Dummy questions data
const questions = {
  verbal: [
    {
      id: 1,
      question: "Choose the word that is most similar in meaning to 'Benevolent':",
      options: ["Malicious", "Kind", "Hostile", "Indifferent"],
      correct: 1,
    },
    {
      id: 2,
      question: "Select the word that is opposite in meaning to 'Abundant':",
      options: ["Scarce", "Plentiful", "Copious", "Ample"],
      correct: 0,
    },
  ],
  quantitative: [
    {
      id: 3,
      question: "If 3x + 5 = 14, what is the value of x?",
      options: ["3", "4", "5", "6"],
      correct: 0,
    },
    {
      id: 4,
      question: "What is 15% of 200?",
      options: ["20", "25", "30", "35"],
      correct: 2,
    },
  ],
  logical: [
    {
      id: 5,
      question: "If all flowers are plants, and some plants are trees, then:",
      options: ["All flowers are trees", "Some flowers are trees", "No flowers are trees", "None of the above"],
      correct: 3,
    },
    {
      id: 6,
      question: "Complete the series: 2, 4, 8, 16, __",
      options: ["20", "24", "32", "36"],
      correct: 2,
    },
  ],
}

export default function AptitudeExam() {
  const [examStarted, setExamStarted] = useState(false)
  const [examType, setExamType] = useState(null)
  const [currentSection, setCurrentSection] = useState("verbal")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [flaggedQuestions, setFlaggedQuestions] = useState([])
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [selectedSections, setSelectedSections] = useState([])

  useEffect(() => {
    if (examStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 300 && prev > 290) {
            // 5 minutes warning
            setShowWarning(true)
            setTimeout(() => setShowWarning(false), 3000)
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [examStarted, timeRemaining])

  const startExam = (type) => {
    setExamType(type)
    setTimeRemaining(type === "quick" ? 600 : 1200) // 10 or 20 minutes
    setExamStarted(true)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }))
  }

  const toggleFlag = (questionId) => {
    setFlaggedQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
    )
  }

  const getAllQuestions = () => {
    let allQuestions = []
    selectedSections.forEach((section) => {
      allQuestions = [...allQuestions, ...questions[section]]
    })
    return allQuestions
  }

  const getQuestionSection = (questionNumber) => {
    let count = 0
    for (const section of selectedSections) {
      const sectionQuestions = questions[section]
      if (questionNumber <= count + sectionQuestions.length) {
        return {
          section,
          questionIndex: questionNumber - count - 1,
        }
      }
      count += sectionQuestions.length
    }
    return null
  }

  const handleGridClick = (questionNumber) => {
    const questionInfo = getQuestionSection(questionNumber)
    if (questionInfo) {
      setCurrentSection(questionInfo.section)
      setCurrentQuestion(questionInfo.questionIndex)
    }
  }

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl space-y-8"
        >
          <h1 className="text-center text-3xl font-bold">Customize Your Test</h1>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Select Sections</h2>
            <div className="grid gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verbal"
                  checked={selectedSections.includes("verbal")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedSections((prev) => [...prev, "verbal"])
                    } else {
                      setSelectedSections((prev) => prev.filter((s) => s !== "verbal"))
                    }
                  }}
                />
                <label
                  htmlFor="verbal"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Verbal Reasoning
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="quantitative"
                  checked={selectedSections.includes("quantitative")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedSections((prev) => [...prev, "quantitative"])
                    } else {
                      setSelectedSections((prev) => prev.filter((s) => s !== "quantitative"))
                    }
                  }}
                />
                <label
                  htmlFor="quantitative"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Quantitative Reasoning
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="logical"
                  checked={selectedSections.includes("logical")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedSections((prev) => [...prev, "logical"])
                    } else {
                      setSelectedSections((prev) => prev.filter((s) => s !== "logical"))
                    }
                  }}
                />
                <label
                  htmlFor="logical"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Logical Reasoning
                </label>
              </div>
            </div>
            <Button className="w-full" disabled={selectedSections.length === 0} onClick={() => startExam("custom")}>
              Start Test
            </Button>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <p>5 minutes remaining!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-4 sticky top-0 z-10"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="font-bold">{formatTime(timeRemaining)}</span>
            </div>
            <Button variant="destructive" onClick={() => setShowSubmitDialog(true)}>
              Submit Exam
            </Button>
          </div>
          <Progress value={(Object.keys(answers).length / (examType === "quick" ? 15 : 30)) * 100} />
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-[1fr_250px] gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Tabs value={currentSection} onValueChange={setCurrentSection}>
              <TabsList
                className="grid w-full"
                style={{ gridTemplateColumns: `repeat(${selectedSections.length}, 1fr)` }}
              >
                {selectedSections.map((section) => (
                  <TabsTrigger key={section} value={section}>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              {selectedSections.map((section) => (
                <TabsContent key={section} value={section} className="space-y-4">
                  {questions[section].map((q, index) => (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium">Question {q.id}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFlag(q.id)}
                          className={flaggedQuestions.includes(q.id) ? "text-yellow-500" : ""}
                        >
                          <BookmarkIcon className="h-5 w-5" />
                        </Button>
                      </div>
                      <p className="mb-4">{q.question}</p>
                      <RadioGroup
                        value={answers[q.id]?.toString()}
                        onValueChange={(value) => handleAnswer(q.id, Number.parseInt(value))}
                      >
                        {q.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
                            <RadioGroupItem value={optionIndex.toString()} id={`q${q.id}-${optionIndex}`} />
                            <Label htmlFor={`q${q.id}-${optionIndex}`}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </motion.div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* Question Navigation Panel */}
          <div className="bg-white rounded-lg shadow p-4 h-fit sticky top-24">
            <h3 className="font-medium mb-4">Question Navigator</h3>
            <div className="grid grid-cols-5 gap-2">
              {getAllQuestions().map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleGridClick(index + 1)}
                  className={`p-2 rounded-md text-center ${
                    answers[index + 1]
                      ? "bg-green-100 text-green-700"
                      : flaggedQuestions.includes(index + 1)
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100"
                  }`}
                >
                  {index + 1}
                </motion.button>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-100" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-100" />
                <span>Flagged for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-100" />
                <span>Not Attempted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Exam</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit your exam? You have{" "}
              {examType === "quick" ? 15 - Object.keys(answers).length : 30 - Object.keys(answers).length} unanswered
              questions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}