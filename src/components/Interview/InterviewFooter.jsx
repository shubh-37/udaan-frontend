import { Variable, Wifi, WifiOff } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export function Footer({ isOnline }) {
  const [isLoading, setIsLoading] = useState(false);

  const submitInterview = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        `${VITE_API_URL}/submit_interview`,
        { interview_id: interviewId, qaa: answers },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      localStorage.setItem('interview_id', interviewId);
      navigate('/review');
    } catch (error) {
      toast('Error', {
        description: 'An error occurred while submitting the interview. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="hidden lg:block border-t lg:mb-0">
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between border-t bg-background mt-4 px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {isOnline ? (
            <>
              <Wifi className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">Connection Stable</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4 text-destructive" />
              <span className="text-destructive">Offline</span>
            </>
          )}
        </div>
        <Button className='bg-black text-white dark:bg-white dark:text-black' onClick={submitInterview}>Submit Interview</Button>
      </div>
    </footer>
  );
}
