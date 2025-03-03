import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

const radarData = [
  { subject: 'Body Language', value: 88 },
  { subject: 'Eye Contact', value: 92 },
  { subject: 'Professionalism', value: 95 },
  { subject: 'Engagement', value: 86 },
  { subject: 'Confidence', value: 90 }
];

const pieData = [
  { name: 'Code Quality', value: 85 },
  { name: 'Problem Solving', value: 90 },
  { name: 'System Design', value: 82 }
];

const barData = [
  { name: 'Articulation', value: 92 },
  { name: 'Technical Terms', value: 88 },
  { name: 'Active Listening', value: 94 }
];

const COLORS = ['#FF7300', '#FF9500', '#FFAA00'];

export default function PerformanceMetrics({ isPremium }) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="space-y-6">
        <AnimatePresence>
          {!isPremium && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-sm bg-card/80 z-10"
            >
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Lock className="w-12 h-12 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Pay to unlock this detailed review</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Unlock interview transcripts, correct solutions, and tips on how to answer each question.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`space-y-6 ${!isPremium && 'blur-sm'}`}>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl">
              <h3 className="text-blue-500 text-lg font-semibold mb-4">Behavioral Analysis</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" stroke="#fff" />
                  <PolarRadiusAxis stroke="#fff" tick={false} />
                  <Radar name="Behavior" dataKey="value" stroke="#1E90FF" fill="#1E90FF" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
              <ul className="mt-4 text-sm">
                {radarData.slice(0, 3).map((item) => (
                  <li key={item.subject} className="flex justify-between">
                    <span>{item.subject}</span>
                    <span>{item.value}%</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Proficiency */}
            <div className="bg-card p-6 rounded-xl">
              <h3 className="text-orange-500 text-lg font-semibold mb-4">Technical Proficiency</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <ul className="mt-4 text-sm">
                {pieData.map((item) => (
                  <li key={item.name} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.value}%</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Communication Skills */}
            <div className="bg-card p-6 rounded-xl">
              <h3 className="text-green-500 text-lg font-semibold mb-4">Communication Skills</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
                  <Bar dataKey="value" fill="#32CD32" />
                </BarChart>
              </ResponsiveContainer>
              <ul className="mt-4 text-sm">
                {barData.map((item) => (
                  <li key={item.name} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
