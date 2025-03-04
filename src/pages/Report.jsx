'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { interviewContext } from '@/context/InterviewContextProvider';
import { toast } from 'sonner';

const loadingStates = [
  { text: 'Analyzing your interview...' },
  { text: 'Evaluating technical skills...' },
  { text: 'Assessing communication...' },
  { text: 'Generating personalized feedback...' },
  { text: 'Finalizing your report...' }
];

const premiumLoadingStates = [
  { text: 'Fetching premium insights...' },
  { text: 'Crunching advanced metrics...' },
  { text: 'Compiling personalized recommendations...' }
];

export default function InterviewReport() {
  const { interviewId: routeInterviewId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reportData, setReportData] = useState(null);

  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [loadingStartTime, setLoadingStartTime] = useState(null);

  const { premiumReview } = useContext(interviewContext);
  const localInterviewId = localStorage.getItem('interview_id');

  useEffect(() => {
    if (!localInterviewId) {
      navigate('/');
    }
  }, [localInterviewId, navigate]);

  useEffect(() => {
    async function fetchReport() {
      try {
        setIsLoading(true);
        if (routeInterviewId) {
          // Premium report: call premiumReview API using interviewId from URL
          const premiumData = await premiumReview(routeInterviewId);
          console.log(premiumData);
          setReportData(premiumData);
          setIsPremium(true);
        } else {
          // Free report: use the data stored in localStorage
          const storedData = localStorage.getItem(`interview_review_data_${localInterviewId}`);
          if (storedData) {
            setReportData(JSON.parse(storedData));
          } else {
            toast.error('Report data not found.');
            navigate('/');
          }
        }
      } catch (error) {
        toast.error('Error fetching report data.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchReport();
  }, [routeInterviewId, localInterviewId, navigate]);

  useEffect(() => {
    const localInterviewId = localStorage.getItem('interview_id');
    const storedData = localStorage.getItem(`interview_review_data_${localInterviewId}`);
    if (storedData) {
      setReportData(JSON.parse(storedData));
      setIsLoading(false);
    } else {
      // navigate('/');
      setIsLoading(false);
    }
  }, []);

  const currentLoadingStates = isPremium ? premiumLoadingStates : loadingStates;

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

  const overallScore = reportData ? reportData.review.overall_score : 0;

  // useEffect(() => {
  //   if (isLoading) {
  //     setLoadingStartTime(Date.now());
  //     setIsLoaderVisible(true);
  //   } else if (loadingStartTime) {
  //     const elapsedTime = Date.now() - loadingStartTime;
  //     const remainingTime = 10000 - elapsedTime;

  //     if (remainingTime > 0) {
  //       const timeout = setTimeout(() => setIsLoaderVisible(false), remainingTime);
  //       return () => clearTimeout(timeout);
  //     } else {
  //       setIsLoaderVisible(false);
  //     }
  //   }
  // }, [isLoading]);

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
          <MultiStepLoader loadingStates={loadingStates} duration={2000} />
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
