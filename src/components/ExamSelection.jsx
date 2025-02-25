"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Clock, FileText } from "lucide-react"
import { useState } from "react"

export default function ExamSelection({ onStart, config }) {
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(true)

  const examTypes = {
    quick: {
      title: "Quick Test",
      duration: "10 minutes",
      questions: 15,
      description: "Perfect for a brief assessment",
    },
    full: {
      title: "Full Test",
      duration: "20 minutes",
      questions: 30,
      description: "Comprehensive evaluation",
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Select Your Test Format</h1>
          <p className="text-muted-foreground">Choose the test format that best suits your needs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(examTypes).map(([key, exam]) => (
            <motion.div key={key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-blue-100 dark:border-blue-900 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle>{exam.title}</CardTitle>
                  <CardDescription>{exam.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{exam.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{exam.questions} questions</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Sections included:
                    <ul className="list-disc list-inside mt-2">
                      {Object.entries(config.subjects)
                        .filter(([, included]) => included)
                        .map(([subject]) => (
                          <li key={subject} className="capitalize">
                            {subject} Reasoning
                          </li>
                        ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200"
                    onClick={() => onStart(key)}
                    variant="default"
                  >
                    Start {exam.title}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <Collapsible open={isGuidelinesOpen} onOpenChange={setIsGuidelinesOpen} className="w-full">
          <Card>
            <CardHeader>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <CardTitle>Test Guidelines</CardTitle>
                {isGuidelinesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="space-y-2">
                <ul className="list-disc list-inside space-y-2">
                  <li>Ensure you have a stable internet connection</li>
                  <li>Do not refresh or close the browser during the test</li>
                  <li>Answer all questions within the allocated time</li>
                  <li>You can flag questions for review</li>
                  <li>Use the section navigation to move between different types of questions</li>
                  <li>Submit your test before the timer runs out</li>
                </ul>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </motion.div>
    </div>
  )
}

