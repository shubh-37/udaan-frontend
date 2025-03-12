'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { profileContext } from '@/context/ProfileContextProvider';
import { useContext, useState, useEffect } from 'react';

export default function InsightsSection() {
  const { dashboardData, aptitudeData } = useContext(profileContext);
  const [chartData, setChartData] = useState([]);

  const confidenceMapping = {
    Low: 50,
    Medium: 65,
    High: 80,
  };

  const confidence = confidenceMapping[dashboardData?.avg_confidence] || 0;
  const speechClarity = Math.round(dashboardData?.avg_speech_clarity) || 0;
  const technicalAccuracy = Math.round(dashboardData?.avg_technical_accuracy) || 0;

  useEffect(() => {
    if (!dashboardData || !dashboardData.past_aptitude_scores) {
      return;
    }

    const lastFiveScores = dashboardData.past_aptitude_scores.slice(-5);

    const newChartData = lastFiveScores.map((score, index) => ({
      label: `Test ${index + 1}`,
      value: score
    }));

    setChartData(newChartData);
  }, [dashboardData]);

  return (
    <div className="p-6 pt-0 bg-background max-h-2xl w-full">
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights & Growth Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Aptitude Score</h3>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">{dashboardData?.avg_aptitude_score}</span>
                  </div>
                  <div className="h-[60px] w-full">
                    <div className="relative h-full w-full">
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200 dark:bg-gray-700"></div>
                      <div className="absolute bottom-[30px] left-0 right-0 h-[1px] bg-gray-200 dark:bg-gray-700 opacity-50"></div>
                      <div className="absolute bottom-[60px] left-0 right-0 h-[1px] bg-gray-200 dark:bg-gray-700 opacity-50"></div>

                      <div className="flex h-full items-end justify-between">
                        {chartData.map((item, index) => (
                          <div
                            key={index}
                            className="group relative w-2 bg-primary rounded-t"
                            style={{ height: `${(item.value)}%` }}
                          >
                            {' '}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded">
                              {item.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Mock Interview Performance</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Confidence</span>
                        <span>{confidence}</span>
                      </div>
                      <div className="mt-1 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Speech Clarity</span>
                        <span>{speechClarity}</span>
                      </div>
                      <div className="mt-1 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Technical Accuracy</span>
                        <span>{technicalAccuracy}</span>
                      </div>
                      <div className="mt-1 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Skills Assessment</h3>
                  <div className="h-[120px] w-full flex items-center justify-center">
                    <div className="relative h-full w-full">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-[30%] w-[30%] rounded-full border border-gray-200 dark:border-gray-700 opacity-30"></div>
                        <div className="absolute h-[60%] w-[60%] rounded-full border border-gray-200 dark:border-gray-700 opacity-50"></div>
                        <div className="absolute h-[90%] w-[90%] rounded-full border border-gray-200 dark:border-gray-700 opacity-70"></div>
                      </div>

                      <div className="absolute inset-0">
                        <svg viewBox="0 0 100 100" className="h-full w-full">
                          <polygon
                            points="50,10 85,30 75,70 25,70 15,30"
                            fill="rgba(99, 102, 241, 0.2)"
                            stroke="rgb(99, 102, 241)"
                            strokeWidth="1"
                          />
                          <text x="50" y="5" textAnchor="middle" fontSize="8" fill="currentColor">
                            Technical
                          </text>
                          <text x="90" y="30" textAnchor="start" fontSize="8" fill="currentColor">
                            Problem-solving
                          </text>
                          <text x="80" y="80" textAnchor="middle" fontSize="8" fill="currentColor">
                            Communication
                          </text>
                          <text x="20" y="80" textAnchor="middle" fontSize="8" fill="currentColor">
                            Teamwork
                          </text>
                          <text x="10" y="30" textAnchor="end" fontSize="8" fill="currentColor">
                            System Design
                          </text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
