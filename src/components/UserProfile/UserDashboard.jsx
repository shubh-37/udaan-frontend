import { useContext, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { TrendingUp, Bolt, Users } from 'lucide-react';
import InterviewForm from '../..//shared/InterviewForm';
import { Link } from 'react-router-dom';
import Loader from '@/shared/Loader';
import { profileContext } from '@/context/ProfileContextProvider';

export default function UserProfileDashboard() {
  const [wave, setWave] = useState(false);
  const token = localStorage.getItem('token');
  const { profile, profileCompletion } = useContext(profileContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setWave((prev) => !prev), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6 bg-background text-foreground  max-w-7xl">
      {isOpen && <InterviewForm isOpen={isOpen} setIsOpen={setIsOpen} setIsLoading={setIsLoading} />}
      {isLoading && <Loader text={'Preparing Interview...'} />}
      <div className="flex flex-col space-y-4 lg:flex-row items-start justify-items-start lg:items-center lg:justify-between">
        <h1 className="text-3xl font-bold">
          Welcome back, {profile?.name ?? 'John Doe'}{' '}
          <motion.span animate={{ rotate: wave ? 20 : -10 }} className="inline-block">
            👋
          </motion.span>
        </h1>
        <div className="space-x-3">
          <Link to="/aptitude">
            <Button variant="outline">Attempt Aptitude Test</Button>
          </Link>
          {token ? (
            <Button size="lg" className="bg-blue-600 text-white" onClick={() => setIsOpen(true)}>
              Start New Interview
            </Button>
          ) : (
            <Link to="/login">
              <Button size="lg" className="bg-blue-600 text-white">
                Start Interview{' '}
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InsightCard icon={Users} title="Total Interviews" value="12" trend="+2 this week" />
        <InsightCard icon={TrendingUp} title="Average Score" value="78%" trend="+5% improvement" />
        <InsightCard
          icon={Bolt}
          title="Profile Strength"
          value={profileCompletion + '%'}
          trend={profileCompletion > 90 ? 'Profile Strength is high' : 'Complete your profile'}
        />
      </div>
    </div>
  );
}

function InsightCard({ icon: Icon, title, value, trend }) {
  return (
    <Card className="p-4 pr-0 pb-0 bg-card flex items-center space-x-4">
      <Icon className="text-black w-10 h-10" />
      <CardContent className="flex-1">
        <p className="text-card-foreground">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-green-500">{trend}</p>
      </CardContent>
    </Card>
  );
}
