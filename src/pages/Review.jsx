import { Link } from 'react-router-dom';
import FlipCard from '../shared/FlipCard';

const InterviewReview = () => {
  const reviewData = {
    score: 85,
    criteria: [
      { heading: 'Speech', score: '7/10', bgColor: '#00A4CC' },
      { heading: 'Confidence', score: '6/10', bgColor: '#FFC107' },
      { heading: 'Technical Skills', score: '9/10', bgColor: '#8BC34A' },
      {
        heading: 'Areas of Improvement',
        score: 'Need to improve on behavioral questions, like STAR methodology.',
        bgColor: '#673AB7'
      }
    ]
  };

  return (
    <div className="p-8 mx-auto space-y-8">
      <Link to="/" className="bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700 transition">
        Back to home
      </Link>
      <p className="text-3xl font-bold text-center text-gray-600">Interview Review</p>

      <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Your Score</h2>
        <div className="flex justify-center items-center space-x-4">
          <p className="text-3xl font-bold text-blue-500">{reviewData.score}%</p>
          <p className="text-lg text-gray-600">You performed above average. Great job!</p>
        </div>
      </div>

      <div className="flex justify-around w-full flex-wrap gap-4">
        {reviewData.criteria.map((item, index) => (
          <>
            <FlipCard
              key={index}
              bgColor={item.bgColor}
              frontContent={<div className="font-bold">{item.heading}</div>}
              backContent={<div> {item.score}</div>}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default InterviewReview;
