'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircularProgress } from '@/components/CircularProgress';
import { InterviewSummary } from '@/components/InterviewSummary';
import ReportHeader from '@/components/InterviewReport/ReportHeader';
import SkillAnalysis from '@/components/InterviewReport/InterviewSkillAnalysis';
import { TestimonialsDemo } from '@/components/InterviewReport/InterviewTestimonials';
import PerformanceMetrics from '@/components/InterviewReport/InterviewPerformanceMetrics';
import { FaqComponent } from '@/components/InterviewReport/InterviewFaq';
import Lenis from '@studio-freight/lenis';
import CareerPathRecommendations from '@/components/InterviewReport/InterviewCareerPath';
import StrengthAndWeakness from '@/components/InterviewReport/StrengthsAndWeakness';
import PersonalizedImprovementPlan from '@/components/InterviewReport/ImprovementPlan';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';

const loadingStates = [
  { text: 'Analyzing your interview...' },
  { text: 'Evaluating technical skills...' },
  { text: 'Assessing communication...' },
  { text: 'Generating personalized feedback...' },
  { text: 'Finalizing your report...' }
];

export default function InterviewReport() {
  const [isPremium, setIsPremium] = useState(false);
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const parameters = [
    {
      title: 'Technical Proficiency',
      color: '#ff7300',
      skills: [
        { name: 'Problem Solving', score: 85, showBar: true },
        { name: 'Code Quality', score: 92, showBar: true },
        { name: 'System Design', score: 78, showBar: true }
      ]
    },
    {
      title: 'Communication Skills',
      color: '#007bff',
      skills: [
        { name: 'Clarity', score: 88, showBar: true },
        { name: 'Articulation', score: 90, showBar: true },
        { name: 'Active Listening', score: 85, showBar: true }
      ]
    },
    {
      title: 'Speech Analysis',
      color: '#28a745',
      skills: [
        { name: 'Speaking Rate', score: 145, unit: 'WPM', showBar: false },
        { name: 'Confidence Level', score: 'High', showBar: false },
        { name: 'Voice Clarity', score: 92, showBar: true }
      ]
    },
    {
      title: 'Time Management',
      color: '#a855f7',
      skills: [
        { name: 'Average Response Time', score: '2.5 mins', showBar: false },
        { name: 'Average Filler Words', score: 5, showBar: false },
        { name: 'Question Completion Rate', score: 95, showBar: true }
      ]
    }
  ];

  const overallScore = Math.round(
    parameters.reduce((total, category) => {
      const numericScores = category.skills.map((skill) => Number(skill.score)).filter((score) => !isNaN(score)); // Remove non-numeric values

      return total + numericScores.reduce((sum, score) => sum + score, 0);
    }, 0) /
      parameters.reduce((count, category) => {
        return count + category.skills.filter((skill) => !isNaN(Number(skill.score))).length;
      }, 0)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <MultiStepLoader loadingStates={loadingStates} loading={isLoading} duration={2000} />
        </div>
      ) : (
        <div>
          <ReportHeader isPremium={isPremium} setIsPremium={setIsPremium} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            ref={containerRef}
            className="max-w-7xl relative  mx-auto mt-12 sm:pt-12"
          >
            <div className="relative flex justify-center">
              <div className="flex justify-between items-center w-full pb-4 border-b mb-8">
                <div className="space-y-2">
                  <SparklesText text="Overall Score" className="text-4xl font-bold" />
                  <p className="test-gray-300 font-mono text-lg">Based on several parameters</p>
                </div>
                <CircularProgress value={overallScore} />
              </div>
            </div>

            <SkillAnalysis parameters={parameters} />
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <SparklesText text="Strengths And Weaknesses Breakdown" className="text-3xl font-bold pb-4" />
              </CardHeader>
              <CardContent>
                <StrengthAndWeakness />
              </CardContent>
            </Card>
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <SparklesText text="Performance Metrics" className="text-3xl font-bold pb-4" />
              </CardHeader>
              <CardContent>
                <PerformanceMetrics isPremium={isPremium} />
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <SparklesText text="Questions by Question Analysis" className="text-3xl font-bold pb-4" />
              </CardHeader>
              <CardContent>
                <InterviewSummary isPremium={isPremium} />
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <SparklesText text="Career Path Recommendations" className="text-3xl font-bold pb-4" />
              </CardHeader>
              <CardContent>
                <CareerPathRecommendations isPremium={isPremium} />
              </CardContent>
            </Card>

            {/* <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Personalized Improvement Plan</CardTitle>
          </CardHeader>
          <CardContent>
          <PersonalizedImprovementPlan isPremium={isPremium}/>
          </CardContent>
        </Card> */}
            <TestimonialsDemo />
            <FaqComponent />
          </motion.div>
        </div>
      )}
    </div>
  );
}
