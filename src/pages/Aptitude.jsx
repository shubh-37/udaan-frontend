'use client';

import { useContext, useState } from 'react';
import ConfigModal from '@/components/ConfigModal';
import ExamSelection from '@/components/ExamSelection';
import ExamInterface from '@/components/ExamInterface';
import ResultPage from '@/components/ResultPage';
import { motion, AnimatePresence } from 'framer-motion';
import { aptitudeContext } from '@/context/AptitudeContextProvider';

export default function App() {
  const [step, setStep] = useState('config');
  const { startQuickTest, startFullTest } = useContext(aptitudeContext);
  const [examConfig, setExamConfig] = useState(null);
  const [examType, setExamType] = useState(null);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);

  const handleConfigSubmit = (config) => {
    setExamConfig(config);
    setStep('selection');
  };

  const handleExamStart = async (type) => {
    const topicMap = {
      verbal: 'Verbal & Reading Comprehension',
      quant: 'Numerical Reasoning',
      logical: 'Logical Reasoning'
    };
    const selectedTopics = Object.keys(examConfig.subjects)
      .filter((key) => examConfig.subjects[key])
      .map((key) => topicMap[key]);
    if (type === 'quick') {
      try {
        const response = await startQuickTest({ topics: selectedTopics });
        setQuestions(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await startFullTest({ topics: selectedTopics });
        setQuestions(response);
      } catch (error) {
        toast('Error', {
          variant: 'destructive',
          description: error.message || 'An error occurred, please try again later.'
        });
      }
    }
    setExamType(type);
    setStep('exam');
  };

  const handleExamComplete = (finalAnswers) => {
    setAnswers(finalAnswers);
    setStep('result');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AnimatePresence mode="wait">
        {step === 'config' && (
          <motion.div
            key="config"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ConfigModal onSubmit={handleConfigSubmit} />
          </motion.div>
        )}

        {step === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ExamSelection onStart={handleExamStart} config={examConfig} />
          </motion.div>
        )}

        {step === 'exam' && (
          <motion.div
            key="exam"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ExamInterface
              config={examConfig}
              examType={examType}
              onComplete={handleExamComplete}
              aptitudeQuestions={questions}
            />
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ResultPage answers={answers} examType={examType} questions={questions} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
