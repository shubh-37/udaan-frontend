'use client';

import { useState } from 'react';
import { Eye, Lock, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '../ui/badge';

export default function PerformanceDashboard() {
  const [activeTab, setActiveTab] = useState('aptitude');

  const aptitudeTests = [
    {
      id: 'APT001',
      date: '2023-10-15',
      score: 85,
      performance: 'Excellent',
      isPremium: true,
      sections: ['verbal', 'quant', 'logical']
    },
    {
      id: 'APT002',
      date: '2023-09-28',
      score: 72,
      performance: 'Good',
      isPremium: true,
      sections: ['verbal', 'quant']
    },
    {
      id: 'APT003',
      date: '2023-09-10',
      score: 68,
      performance: 'Average',
      isPremium: false,
      sections: ['verbal', 'logical']
    },
    {
      id: 'APT004',
      date: '2023-08-22',
      score: 91,
      performance: 'Excellent',
      isPremium: false,
      sections: ['verbal']
    }
  ];

  const mockInterviews = [
    {
      id: 'MI001',
      date: '2023-10-18',
      topic: 'System Design',
      summary: 'Good understanding of scalability concepts',
      isPremium: true
    },
    {
      id: 'MI002',
      date: '2023-10-05',
      topic: 'Data Structures',
      summary: 'Strong problem-solving skills, needs improvement in time complexity analysis',
      isPremium: true
    },
    {
      id: 'MI003',
      date: '2023-09-20',
      topic: 'Behavioral',
      summary: 'Excellent communication, could improve on specific examples',
      isPremium: false
    },
    {
      id: 'MI004',
      date: '2023-09-01',
      topic: 'Frontend Development',
      summary: 'Strong React knowledge, needs improvement in CSS architecture',
      isPremium: false
    }
  ];

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
                      {aptitudeTests.map((test, index) => (
                        <tr
                          key={test.id}
                          className={`border-t border-gray-200 dark:border-gray-700 ${
                            index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/50' : ''
                          }`}
                        >
                          <td className="px-4 py-3">{formatDate(test.date)}</td>
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
                            {test.sections.map((section, idx) => (
                              <Badge key={idx} className="text-xs px-2 py-1">
                                {section}
                              </Badge>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                      {mockInterviews.map((interview, index) => (
                        <tr
                          key={interview.id}
                          className={`border-t border-gray-200 dark:border-gray-700 ${
                            index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/50' : ''
                          }`}
                        >
                          <td className="px-4 py-3">{formatDate(interview.date)}</td>
                          <td className="px-4 py-3">{interview.id}</td>
                          <td className="px-4 py-3">{interview.topic}</td>
                          <td className="px-4 py-3 max-w-xs truncate">{interview.summary}</td>
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
                                <span>Upgrade for Full Report</span>
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
