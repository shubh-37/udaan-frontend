'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InsightsSection() {
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
                    <span className="text-3xl font-bold">78</span>
                    <span className="text-sm text-green-600 dark:text-green-400">+5% from last month</span>
                  </div>
                  <div className="h-[60px] w-full">
                    <div className="relative h-full w-full">
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200 dark:bg-gray-700"></div>
                      <div className="absolute bottom-[30px] left-0 right-0 h-[1px] bg-gray-200 dark:bg-gray-700 opacity-50"></div>
                      <div className="absolute bottom-[60px] left-0 right-0 h-[1px] bg-gray-200 dark:bg-gray-700 opacity-50"></div>

                      <div className="flex h-full items-end justify-between">
                        <div className="group relative h-[40%] w-2 bg-primary rounded-t">
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded">
                            65
                          </div>
                        </div>
                        <div className="group relative h-[55%] w-2 bg-primary rounded-t">
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded">
                            75
                          </div>
                        </div>
                        <div className="group relative h-[70%] w-2 bg-primary rounded-t">
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded">
                            82
                          </div>
                        </div>
                        <div className="group relative h-[60%] w-2 bg-primary rounded-t">
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded">
                            78
                          </div>
                        </div>
                        <div className="group relative h-[80%] w-2 bg-primary rounded-t">
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded">
                            90
                          </div>
                        </div>
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
                        <span>72%</span>
                      </div>
                      <div className="mt-1 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Speech Clarity</span>
                        <span>85%</span>
                      </div>
                      <div className="mt-1 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Technical Accuracy</span>
                        <span>68%</span>
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
            {/* 
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">AI-Generated Insights</h3>
                  <ul className="space-y-2">
                    <li className="grid grid-cols-[max-content_auto] gap-2">
                      <Badge
                        variant="outline"
                        className="mt-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-none"
                      >
                        Improve
                      </Badge>
                      <span className="text-sm">System design explanations need more clarity</span>
                    </li>
                    <li className="grid grid-cols-[max-content_auto] gap-2">
                      <Badge
                        variant="outline"
                        className="mt-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-none"
                      >
                        Strength
                      </Badge>
                      <span className="text-sm">Excellent problem-solving approach</span>
                    </li>
                    <li className="grid grid-cols-[max-content_auto] gap-2">
                      <Badge
                        variant="outline"
                        className="mt-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-none"
                      >
                        Tip
                      </Badge>
                      <span className="text-sm">Practice more behavioral questions for leadership roles</span>
                    </li>
                    <li className="grid grid-cols-[max-content_auto] gap-2">
                      <Badge
                        variant="outline"
                        className="mt-0.5 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-none"
                      >
                        Trend
                      </Badge>
                      <span className="text-sm">Your technical scores have improved 15% in the last 3 months</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card> */}

            {/* <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Peer Benchmarking Insights</h3>
                  <ul className="space-y-2">
                    <li className="grid grid-cols-[max-content_auto] gap-2">
                      <Badge
                        variant="outline"
                        className="mt-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-none"
                      >
                        Top Performer
                      </Badge>
                      <span className="text-sm">
                        Your problem-solving skills are among the top 20% of candidates in your field.
                      </span>
                    </li>
                    <li className="grid grid-cols-[max-content_auto] gap-2">
                      <Badge
                        variant="outline"
                        className="mt-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-none"
                      >
                        Communication
                      </Badge>
                      <span className="text-sm">Your communication skills match closely with industry benchmarks.</span>
                    </li>
                    <li className="grid grid-cols-[max-content_auto] gap-2">
                      <Badge
                        variant="outline"
                        className="mt-0.5 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 border-none"
                      >
                        Growth
                      </Badge>
                      <span className="text-sm">
                        Focusing on system design can further elevate your ranking among peers.
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}