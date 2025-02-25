'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { BookmarkIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const dummyQuestions = {
  verbal: [
    {
      id: 'v1',
      text: "Choose the word that best completes the sentence: The scientist's ___ approach to research earned her widespread respect in the academic community.",
      options: ['methodical', 'haphazard', 'careless', 'random'],
      correct: 'methodical'
    },
    {
      id: 'v2',
      text: 'Select the pair of words that best expresses a relationship similar to that expressed in the original pair: CANVAS : PAINT',
      options: ['paper : pencil', 'bread : butter', 'wall : brick', 'shoe : leather'],
      correct: 'paper : pencil'
    },
    {
      id: 'v3',
      text: "Choose the word that is most nearly opposite in meaning to 'PROLIFIC':",
      options: ['barren', 'fertile', 'productive', 'abundant'],
      correct: 'barren'
    }
  ],
  quant: [
    {
      id: 'q1',
      text: 'If x + 2 = 5, what is the value of 2x + 4?',
      options: ['6', '8', '10', '12'],
      correct: '8'
    },
    {
      id: 'q2',
      text: 'A train travels 120 kilometers in 2 hours. What is its speed in meters per second?',
      options: ['16.67', '20', '25', '30'],
      correct: '16.67'
    },
    {
      id: 'q3',
      text: 'What is the area of a triangle with base 8 units and height 12 units?',
      options: ['24', '48', '96', '108'],
      correct: '48'
    }
  ],
  logical: [
    {
      id: 'l1',
      text: 'If all A are B, and all B are C, which of the following must be true?',
      options: ['All A are C', 'All C are A', 'Some A are not C', 'None of the above'],
      correct: 'All A are C'
    },
    {
      id: 'l2',
      text: 'In a row of children facing north, Rahul is 10th from the left and Amit is 10th from the right. If Rahul is 15th from the right, how many children are there in the row?',
      options: ['24', '25', '26', '27'],
      correct: '24'
    },
    {
      id: 'l3',
      text: "If 'FRIEND' is coded as 'HUMJTK', how is 'CANDLE' coded?",
      options: ['EDRFNG', 'DCQIPG', 'ECPFNG', 'ECOFNG'],
      correct: 'ECPFNG'
    }
  ]
};

export default function ExamInterface({ config, examType, onComplete }) {
  const selectedSubjects = Object.keys(config.subjects).filter((key) => config.subjects[key]);
  const [currentSection, setCurrentSection] = useState(selectedSubjects[0] || 'verbal');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(examType === 'quick' ? 600 : 1200);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  const filteredQuestions = selectedSubjects.reduce((acc, subject) => {
    acc[subject] = dummyQuestions[subject] || [];
    return acc;
  }, {});

  const totalQuestions = Object.values(filteredQuestions).reduce((sum, questions) => sum + questions.length, 0);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const toggleFlagged = (questionId) => {
    setFlaggedQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 60 && prev > 59) {
          setShowTimeWarning(true);
        }
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(answers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, onComplete, showTimeWarning]);

  const handleSubmit = () => {
    onComplete(answers)
    setShowSubmitDialog(false)
  }

  const currentQuestions = filteredQuestions[currentSection] || [];
  const currentQuestion = currentQuestions[currentQuestionIndex] || {};

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Question Navigation Sidebar */}
      <div className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto fixed left-0">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Questions</h3>
          {Object.entries(filteredQuestions).map(([section, questions]) => (
            <div key={section} className="mb-4">
              <h4 className="text-sm font-medium capitalize mb-2 text-gray-500">{section}</h4>
              <div className="grid grid-cols-4 gap-0.5">
                {questions.map((question, index) => {
                  const isAnswered = answers[question.id];
                  const isFlagged = flaggedQuestions.includes(question.id);
                  const isCurrent = currentSection === section && currentQuestionIndex === index;

                  return (
                    <button
                      key={question.id}
                      onClick={() => {
                        setCurrentSection(section);
                        setCurrentQuestionIndex(index);
                      }}
                      className={`
                      w-8 h-8 rounded-lg text-sm font-medium
                      transition-all duration-200
                      ${isCurrent ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                      ${
                        isAnswered
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : isFlagged
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                      }
                    `}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ml-64 flex-1 p-6">
        <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 p-4 rounded-lg border shadow-sm hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4 ">
            <motion.div
              className={`text-2xl font-bold flex items-center ${timeLeft <= 60 ? 'text-red-500' : ''}`}
              animate={
                showTimeWarning
                  ? {
                      scale: [1, 1.1, 1],
                      transition: { duration: 0.5, repeat: Number.POSITIVE_INFINITY }
                    }
                  : {}
              }
            >
              <Clock className="inline-block mr-2" />
              {formatTime(timeLeft)}
            </motion.div>
            <Progress
              value={(Object.keys(answers).length / totalQuestions) * 100}
              className="w-1/3"
            />
            <Button variant="destructive" onClick={() => setShowSubmitDialog(true)}>
              Submit Test
            </Button>
          </div>

          <Tabs value={currentSection} onValueChange={setCurrentSection}>
            <TabsList className="w-full">
              {selectedSubjects.map((section) => (
                <TabsTrigger key={section} value={section} className="w-full capitalize">
                  {section}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Question Area with updated styling */}
        <div className="mt-8">
          {currentQuestion.id ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Question {currentQuestionIndex + 1}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFlagged(currentQuestion.id)}
                    className={
                      flaggedQuestions.includes(currentQuestion.id) ? 'text-yellow-500 hover:text-yellow-600' : ''
                    }
                  >
                    <BookmarkIcon className={flaggedQuestions.includes(currentQuestion.id) ? 'fill-yellow-500' : ''} />
                  </Button>
                </div>

                <div className="p-6 rounded-lg border bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <p className="text-lg mb-6">{currentQuestion.text}</p>
                  <RadioGroup
                    value={answers[currentQuestion.id] || ''}
                    onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                  >
                    <div className="space-y-4">
                      {currentQuestion.options.map((option, index) => (
                        <div
                          key={index}
                          className={`
                            flex items-center space-x-2 rounded-lg border p-4
                            transition-all duration-200
                            ${
                              answers[currentQuestion.id] === option
                                ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                            }
                          `}
                        >
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <p>No questions available for this section.</p>
          )}
        </div>

        {/* Updated Navigation Footer */}
        <div className="fixed bottom-0 left-64 right-0 bg-white dark:bg-gray-900 border-t p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Button
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              disabled={currentQuestionIndex === 0}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <ChevronLeft className="mr-2" /> Previous
            </Button>
            <Button
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              disabled={currentQuestionIndex === dummyQuestions[currentSection].length - 1}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Next <ChevronRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSubmitDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Confirm Submission</h3>
              <p className="mb-6">
                Are you sure you want to submit the test? You have {formatTime(timeLeft)} remaining.
              </p>
              <div className="flex justify-end space-x-4">
                <Button variant="secondary" className='border border-gray-200' onClick={() => setShowSubmitDialog(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
