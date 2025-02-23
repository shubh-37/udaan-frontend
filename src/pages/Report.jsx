'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircularProgress } from '@/components/CircularProgress';
import { ParameterScore } from '@/components/ParameterScore';
import { DetailedBreakdown } from '@/components/DetailedBreakdown';
import { InterviewSummary } from '@/components/InterviewSummary';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { SparklesText } from '@/components/magicui/sparkles-text';
import reportFemale from '@/assets/reportFemale.svg';
import reportNotebook from '@/assets/reportNotebook.svg';
import reportMale from '@/assets/reportMale.svg';
import reportQuestion from '@/assets/reportQuestion.svg';
import upArrow from '@/assets/upArrow.svg';
import { cn } from '../lib/utils';

export default function InterviewReport() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity
    }
  };

  const parameters = [
    {
      name: 'Technical Skills',
      score: 85,
      color: 'bg-blue-500',
      strengths: ['Strong problem-solving abilities', 'Excellent coding practices', 'Good understanding of algorithms'],
      weaknesses: ['Limited experience with cloud technologies', 'Need improvement in system design'],
      improvements: ['Take online courses in cloud computing', 'Practice more system design questions']
    },
    {
      name: 'Communication',
      score: 78,
      color: 'bg-green-500',
      strengths: ['Clear articulation of ideas', 'Good listening skills'],
      weaknesses: ['Sometimes too brief in explanations', 'Could improve technical terminology usage'],
      improvements: ['Practice explaining complex concepts', 'Join technical discussion groups']
    },
    {
      name: 'Problem Solving',
      score: 92,
      color: 'bg-purple-500',
      strengths: ['Excellent analytical thinking', 'Creative solutions', 'Good time management'],
      weaknesses: ['Could consider more edge cases', 'Sometimes jumps to conclusions'],
      improvements: ['Practice more edge case analysis', 'Take time to evaluate multiple approaches']
    },
    {
      name: 'Teamwork',
      score: 88,
      color: 'bg-orange-500',
      strengths: ['Great collaboration skills', 'Open to feedback', 'Supportive attitude'],
      weaknesses: ['Could be more proactive in leadership', 'Sometimes hesitant to disagree'],
      improvements: ['Take initiative in team projects', 'Practice constructive disagreement']
    }
  ];

  const overallScore = Math.round(parameters.reduce((acc, param) => acc + param.score, 0) / parameters.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background2 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative h-[400px] w-full">
          {/* Background pattern */}
          <DotPattern
            glow={true}
            className={cn('[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]')}
            style={{ height: '400px' }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative inline-block">
              <SparklesText text="Interview Report" className="text-7xl font-bold text-center bg-clip-text" />

              <motion.img
                src={reportFemale}
                alt="report-female"
                width="250"
                height="250"
                className="absolute -top-40 -left-40 transform -translate-x-1/2 -translate-y-1/2 z-10"
                animate={floatAnimation}
              />
              <motion.img
                src={reportMale}
                alt="report-male"
                width="250"
                height="250"
                className="absolute -top-40 -right-40 transform translate-x-1/2 -translate-y-1/2 z-10"
                animate={floatAnimation}
              />
              <motion.img
                src={reportNotebook}
                alt="report-notebook"
                width="250"
                height="250"
                className="absolute -bottom-39 -right-40 transform translate-x-1/2 translate-y-1/2 z-10"
                animate={floatAnimation}
              />
              <motion.img
                src={reportQuestion}
                alt="report-question"
                width="250"
                height="250"
                className="absolute -bottom-39 -left-40 transform -translate-x-1/2 translate-y-1/2 z-10"
                animate={floatAnimation}
              />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto mt-12"
        >
          <div className="relative flex justify-center my-20">
            <CircularProgress value={overallScore} />
            <motion.img
              src={upArrow}
              alt="up-arrow"
              width="100"
              height="100"
              className="absolute left-[calc(50%+120px)] top-1/2 -translate-y-1/2 z-10"
              animate={floatAnimation}
            />
            <div className="absolute left-[calc(50%+130px)] top-[calc(50%-40px)] -translate-y-1/2 text-center">
              <p className="text-2xl font-mono">Your Overall Score</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {parameters.map((param, index) => (
              <motion.div
                key={param.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ParameterScore parameter={param} />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 w-full">
            {parameters.map((param, index) => (
              <motion.div
                key={param.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full w-full"
              >
                <DetailedBreakdown parameter={param} className="w-full flex flex-col h-full min-h-[300px]" />
              </motion.div>
            ))}
          </div>

          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Detailed Review</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Unlock detailed review</span>
                <Switch checked={isUnlocked} onCheckedChange={setIsUnlocked} />
              </div>
            </CardHeader>
            <CardContent>
              <InterviewSummary isUnlocked={isUnlocked} />
            </CardContent>
          </Card>
        </motion.div>
    </div>
  );
}
