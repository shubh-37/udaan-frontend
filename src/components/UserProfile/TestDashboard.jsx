'use client';

import { useState, useEffect, useContext, useMemo } from 'react';
import { Eye, Lock, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { profileContext } from '@/context/ProfileContextProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '../ui/badge';
import { Pagination } from '../Pagination';
import { interviewContext } from '@/context/InterviewContextProvider';
import { toast } from 'sonner';

export default function PerformanceDashboard() {
  const [activeTab, setActiveTab] = useState('aptitude');
  const [aptitudeTests, setAptitudeTests] = useState([]);
  const [mockInterviews, setMockInterviews] = useState([]);
  const { handlePayment } = useContext(interviewContext);
  const [isLoading, setIsLoading] = useState(false);
  const { dashboardData, aptitudeScores } = useContext(profileContext);
  const [currentPageAptitude, setCurrentPageAptitude] = useState(1);
  const [currentPageInterview, setCurrentPageInterview] = useState(1);
  const rowsPerPage = 5;

  const sortByDateTime = (a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA;
  };

  const initiatePayment = async (interviewId) => {
    setIsLoading(true);
    try {
      const response = await handlePayment(interviewId);
      // Add paid review API
    } catch (error) {
      toast.error('Payment Error', {
        description: 'Something went wrong.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (aptitudeScores) {
      let formattedAptitudeTests = aptitudeScores?.map((test, index) => ({
        id: `APT00${index + 1}`,
        date: test.created_at,
        score: test.score,
        performance: test.score >= 80 ? 'Excellent' : test.score >= 50 ? 'Average' : 'Poor',
        sections: test.topics || []
      }));
      formattedAptitudeTests = [...formattedAptitudeTests].sort(sortByDateTime);
      setAptitudeTests(formattedAptitudeTests);
    }
  }, [aptitudeScores]);

  useEffect(() => {
    if (dashboardData && dashboardData.interviews) {
      let sortedMockInterviews = [...dashboardData.interviews].sort(sortByDateTime);
      setMockInterviews(sortedMockInterviews);
    }
  }, [dashboardData]);

  const sortedAptitudeTests = useMemo(() => {
    return [...aptitudeTests].sort(sortByDateTime);
  }, [aptitudeTests]);
  
  const sortedMockInterviews = useMemo(() => {
    return [...mockInterviews].sort(sortByDateTime);
  }, [mockInterviews]);

  const indexOfLastAptitude = currentPageAptitude * rowsPerPage;
  const indexOfFirstAptitude = indexOfLastAptitude - rowsPerPage;
  const currentAptitudeTests = aptitudeTests.slice(indexOfFirstAptitude, indexOfLastAptitude);

  const handleAptitudePageChange = (pageNumber) => {
    setCurrentPageAptitude(pageNumber);
  };

  const indexOfLastInterview = currentPageInterview * rowsPerPage;
  const indexOfFirstInterview = indexOfLastInterview - rowsPerPage;
  const currentMockInterviews = mockInterviews.slice(indexOfFirstInterview, indexOfLastInterview);

  const handleInterviewPageChange = (pageNumber) => {
    setCurrentPageInterview(pageNumber);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPerformanceBadgeColor = (performance) => {
    switch (performance) {
      case 'Excellent':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Good':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Average':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Needs Improvement':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 pt-0 bg-background max-h-2xl w-full">
      <Card>
        <CardHeader>
          <CardTitle>Performance Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="aptitude" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="aptitude" onClick={() => setActiveTab('aptitude')}>
                Aptitude Tests
              </TabsTrigger>
              <TabsTrigger value="interviews" onClick={() => setActiveTab('interviews')}>
                AI Mock Interviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="aptitude" className="space-y-4">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                        <th className="px-4 py-3 font-medium">Date</th>
                        <th className="px-4 py-3 font-medium">Test ID</th>
                        <th className="px-4 py-3 font-medium">Score</th>
                        <th className="px-4 py-3 font-medium">Performance</th>
                        <th className="px-4 py-3 font-medium">Sections</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAptitudeTests.map((test, index) => (
                        <tr
                          key={test._id}
                          className={`border-t border-gray-200 dark:border-gray-700 ${index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}`}
                        >
                          <td className="px-4 py-3">{formatDate(test.created_at)}</td>
                          <td className="px-4 py-3">{test.id}</td>
                          <td className="px-4 py-3">{test.score}/100</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPerformanceBadgeColor(
                                test.performance
                              )}`}
                            >
                              {test.performance}
                            </span>
                          </td>
                          <td className="px-4 py-3 flex flex-wrap gap-2">
                            {test.topics?.map((topic, idx) => (
                              <Badge key={idx} className="text-xs px-2 py-1">
                                {topic}
                              </Badge>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Pagination
                    currentPage={currentPageAptitude}
                    totalItems={aptitudeTests.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleAptitudePageChange}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interviews" className="space-y-4">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                        <th className="px-4 py-3 font-medium">Date</th>
                        <th className="px-4 py-3 font-medium">Session ID</th>
                        <th className="px-4 py-3 font-medium">Topic</th>
                        <th className="px-4 py-3 font-medium">Summary</th>
                        <th className="px-4 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentMockInterviews.map((interview, index) => (
                        <tr
                          key={interview._id}
                          className={`border-t border-gray-200 dark:border-gray-700 ${index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}`}
                        >
                          <td className="px-4 py-3">{formatDate(interview.created_at)}</td>
                          <td className="px-4 py-3">{interview._id}</td>
                          <td className="px-4 py-3">{interview.job_role || '-'} </td>
                          <td className="px-4 py-3 max-w-xs truncate">{interview.overall_summary || '-'}</td>
                          <td className="px-4 py-3">
                            {interview.isPremium ? (
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                  <Eye className="h-4 w-4" />
                                  <span>View Report</span>
                                </Button>
                              </div>
                            ) : (
                              <Button variant="outline" size="sm" className="h-8 gap-1">
                                <Lock className="h-3 w-3" />
                                <span onClick={() => initiatePayment(interview._id)}>Upgrade for Full Report</span>
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Pagination
                    currentPage={currentPageInterview}
                    totalItems={mockInterviews.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleInterviewPageChange}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
