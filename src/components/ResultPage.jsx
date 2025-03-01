import { useEffect, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { aptitudeContext } from '@/context/AptitudeContextProvider';

export default function ResultPage({ answers, questions, examType }) {
  const { submitTest } = useContext(aptitudeContext);
  // Use a ref instead of state to track submission
  const submissionRef = useRef(false);

  // Initialize variables for scoring
  const sectionScores = {};
  let correctCount = 0;
  const totalQuestions = questions.length;

  // Process questions and merge with answers
  const questionDetails = questions.map((question) => {
    const { id, topic, question: questionText, answer } = question;
    const userAnswer = answers[id]?.selectedOption || null;
    const isCorrect = answers[id]?.isCorrect || false;

    if (isCorrect) correctCount += 1;

    // Track section-wise scores
    if (!sectionScores[topic]) {
      sectionScores[topic] = { correct: 0, total: 0 };
    }
    sectionScores[topic].total += 1;
    if (isCorrect) sectionScores[topic].correct += 1;

    return {
      id,
      topic,
      question: questionText,
      userAnswer,
      answer,
      isCorrect
    };
  });

  const wrongCount = totalQuestions - correctCount;

  const sectionScoresPercent = Object.keys(sectionScores).reduce((acc, section) => {
    acc[section] = Math.round((sectionScores[section].correct / sectionScores[section].total) * 100);
    return acc;
  }, {});

  const totalScore = totalQuestions ? Math.round((correctCount / totalQuestions) * 100) : 0;

  useEffect(() => {
    const submitResults = async () => {
      if (submissionRef.current) return;

      try {
        submissionRef.current = true;

        await submitTest({
          correct_no_of_questions: correctCount,
          wrong_no_of_answers: wrongCount,
          score: totalScore
        });
      } catch (error) {
        console.error('Error submitting test:', error);
      }
    };
    submitResults();

    return () => {
      console.log('ResultPage component unmounting, submission status:', submissionRef.current);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Score Summary Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-blue-100 dark:border-blue-900 hover:shadow-lg transition-all duration-300">
          <CardHeader className="text-center flex items-center">
            <CardTitle className="text-3xl">Test Results</CardTitle>
            <CardDescription>{examType === 'quick' ? 'Quick Test' : 'Full Test'} Summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">{totalScore}%</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${totalScore}, 100`}
                    className="stroke-blue-500"
                  />
                </svg>
              </div>

              {/* Section-wise Scores */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8">
                {Object.entries(sectionScoresPercent).map(([section, score]) => (
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

        {/* Detailed Review Section */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Review</CardTitle>
            <CardDescription>Review your answers</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {questionDetails.map((detail, index) => (
                <AccordionItem key={detail.id} value={detail.id}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-4">
                      <span>Question {index + 1}</span>
                      <Badge variant={detail.isCorrect ? 'default' : 'destructive'}>
                        {detail.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                        ) : (
                          <XCircle className="w-4 h-4 mr-1" />
                        )}
                        {detail.isCorrect ? 'Correct' : 'Incorrect'}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-4">
                      <p className="font-medium">{detail.question}</p>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Your Answer:</span>
                          <span className={detail.isCorrect ? 'text-green-600' : 'text-red-600'}>
                            {detail.userAnswer || 'No Answer'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Correct Answer:</span>
                          <span className="text-green-600">{detail.answer}</span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Home Button */}
        <div className="flex justify-center mt-6">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
            <a href="/">Go to Home</a>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
