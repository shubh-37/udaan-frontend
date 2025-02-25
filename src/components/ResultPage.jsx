'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function ResultPage({ answers, examType }) {

  console.log('Answers Prop:', answers);
  
  const results = {
    totalScore: 85,
    sectionScores: {
      verbal: 90,
      quant: 80,
      logical: 85
    },
    questionDetails: [
      {
        id: 'v1',
        section: 'verbal',
        question:
          "Choose the word that best completes the sentence: The scientist's ___ approach to research earned her widespread respect in the academic community.",
        userAnswer: 'methodical',
        correctAnswer: 'methodical',
        explanation: "'Methodical' is correct as it describes a careful and systematic approach to work."
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-blue-100 dark:border-blue-900 hover:shadow-lg transition-all duration-300">
          <CardHeader className="text-center flex items-center">
            <CardTitle className="text-3xl">Test Results </CardTitle>
            <CardDescription>{examType === 'quick' ? 'Quick Test' : 'Full Test'} Summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">{results.totalScore}%</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${results.totalScore}, 100`}
                    className="stroke-blue-500"
                  />
                </svg>
              </div>
              <div className="grid grid-cols-3 gap-4 w-full mt-8">
                {Object.entries(results.sectionScores).map(([section, score]) => (
                  <Card
                    key={section}
                    className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg capitalize">{section}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <span className="text-2xl font-bold">{score}%</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Review</CardTitle>
            <CardDescription>Review your answers and explanations</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {results.questionDetails.map((detail, index) => (
                <AccordionItem key={detail.id} value={detail.id}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-4">
                      <span>Question {index + 1}</span>
                      <Badge variant={detail.userAnswer === detail.correctAnswer ? 'default' : 'destructive'}>
                        {detail.userAnswer === detail.correctAnswer ? (
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                        ) : (
                          <XCircle className="w-4 h-4 mr-1" />
                        )}
                        {detail.userAnswer === detail.correctAnswer ? 'Correct' : 'Incorrect'}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-4">
                      <p className="font-medium">{detail.question}</p>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Your Answer:</span>
                          <span
                            className={detail.userAnswer === detail.correctAnswer ? 'text-green-600' : 'text-red-600'}
                          >
                            {detail.userAnswer}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Correct Answer:</span>
                          <span className="text-green-600">{detail.correctAnswer}</span>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="font-medium">Explanation:</p>
                        <p className="mt-2">{detail.explanation}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
            <a href="/">Go to Home</a>
          </Button>
        </div>
      </motion.div>

      
    </div>
  );
}
