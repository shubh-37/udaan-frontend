'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [isPremium, setIsPremium] = useState(false);
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const interviewId = localStorage.getItem('interview_id');
    const storedData = localStorage.getItem(`interview_review_data_${interviewId}`);
    if (storedData) {
      setReportData(JSON.parse(storedData));
      setIsLoading(false);
    } else {
      // navigate('/');
      setIsLoading(false);
    }
  }, []);

  const parameters = reportData
    ? [
        {
          title: 'Communication Skills',
          color: '#007bff',
          skills: [
            { name: 'Clarity', score: reportData.review.skill_analysis.communication_skills.clarity, showBar: true },
            {
              name: 'Articulation',
              score: reportData.review.skill_analysis.communication_skills.articulation,
              showBar: true
            },
            {
              name: 'Active Listening',
              score: reportData.review.skill_analysis.communication_skills.active_listening,
              showBar: true
            }
          ]
        },
        {
          title: 'Conceptual Understanding',
          color: '#ff7300',
          skills: [
            {
              name: 'Fundamental Concepts',
              score: reportData.review.skill_analysis.conceptual_understanding.fundamental_concepts,
              showBar: true
            },
            {
              name: 'Theoretical Application',
              score: reportData.review.skill_analysis.conceptual_understanding.theoretical_application,
              showBar: true
            },
            {
              name: 'Analytical Reasoning',
              score: reportData.review.skill_analysis.conceptual_understanding.analytical_reasoning,
              showBar: true
            }
          ]
        },
        {
          title: 'Speech Analysis',
          color: '#28a745',
          skills: [
            {
              name: 'Avg Filler Words',
              score: reportData.review.skill_analysis.speech_analysis.avg_filler_words_used,
              showBar: false
            },
            {
              name: 'Confidence Level',
              score: reportData.review.skill_analysis.speech_analysis.avg_confidence_level,
              showBar: false
            },
            {
              name: 'Fluency Rate',
              score: reportData.review.skill_analysis.speech_analysis.avg_fluency_rate,
              showBar: true
            }
          ]
        },
        {
          title: 'Time Management',
          color: '#a855f7',
          skills: [
            {
              name: 'Avg Response Time',
              score: reportData.review.skill_analysis.time_management.average_response_time,
              showBar: false
            },
            {
              name: 'Question Completion Rate',
              score: reportData.review.skill_analysis.time_management.question_completion_rate,
              showBar: true
            }
          ]
        }
      ]
    : [];

  const overallScore = reportData
    ? reportData.review.overall_score
    : 0;

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
