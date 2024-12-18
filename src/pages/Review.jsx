import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FlipCard from '../shared/FlipCard';
import { FeedbackForm } from '../shared/FeedbackForm';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';

const InterviewReview = () => {
  const [review, setReview] = useState({ score: 0, criteria: [] });
  const [quote, setQuote] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const quotes = [
    'Your preparation defines your future.',
    'Success is where preparation meets opportunity. – Bobby Unser',
    'Every interview is a chance to write your success story.',
    'Dream big, prepare bigger, and achieve the biggest.',
    'The best investment you can make is in yourself.',
    'Your journey to success starts with a single well-prepared step.',
    'In the middle of every difficulty lies opportunity. – Albert Einstein',
    'Confidence comes from preparation. Ace every step.'
  ];

  function parseFeedback(obj) {
    const feedback = JSON.parse(obj);
    const overallScore = feedback['overall_score'];
    const speechScore = feedback['speech'];
    const confidenceScore = feedback['confidence'];
    const technicalSkillsScore = feedback['technical_skills'];
    const areasOfImprovement = feedback['areas_of_improvement'];

    setReview({
      score: overallScore * 10,
      criteria: [
        {
          heading: 'Technical Skills',
          score: `${technicalSkillsScore}/10`,
          bgColor: '#9ca3af',
          fontSize: 'x-large',
          scoreNum: technicalSkillsScore
        },
        {
          heading: 'Overall Feedback',
          score: areasOfImprovement,
          bgColor: '#9ca3af',
          fontSize: 'medium'
        },
        {
          heading: 'Speech',
          score: 'Currently under development! Available very soon',
          bgColor: '#9ca3af',
          fontSize: 'x-large'
        },
        {
          heading: 'Confidence',
          score: 'Currently under development! Available very soon',
          bgColor: '#9ca3af',
          fontSize: 'x-large'
        }
      ]
    });
  }

  useEffect(() => {
    const review = localStorage.getItem('review');
    parseFeedback(review);

    // Set a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
    setTimeout(() => {
      setShowFeedbackForm(true);
    }, 3000);
  }, []);

  return (
    <div className="mx-auto space-y-8">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b">
        <Link className="flex items-center justify-center" to="/">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-br from-blue-600 via-green-600 to-purple-600 text-transparent bg-clip-text">
            PrepSOM
          </span>
        </Link>
        <div className="flex justify-center">
          <Button onClick={() => setShowFeedbackForm(true)}>Submit Feedback</Button>
        </div>
      </header>
      <p className="text-3xl font-bold text-center text-gray-600">Interview Review</p>
      <div className="bg-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Your Score</h2>
        <div className="border-2 border-blue-500 rounded-full w-min p-2">
          <p className="text-3xl  font-bold text-blue-500">{review.score}%</p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg shadow p-4 text-center text-xl font-semibold text-gray-600 italic mx-2">
        {quote}
      </div>

      <div className="flex justify-around w-full flex-wrap gap-4">
        {review.criteria.map((item, index) => (
          <FlipCard
            key={index}
            bgColor={item.bgColor}
            fontSize={item.fontSize}
            frontContent={<div className="font-bold">{item.heading}</div>}
            backContent={<div> {item.score}</div>}
            rating={item?.scoreNum ? parseInt(item.scoreNum) / 2 : null}
          />
        ))}
      </div>

      {showFeedbackForm && <FeedbackForm isOpen={showFeedbackForm} onOpenChange={setShowFeedbackForm} />}
    </div>
  );
};

export default InterviewReview;
