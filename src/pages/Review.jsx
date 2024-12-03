import { Link } from 'react-router-dom';
import FlipCard from '../shared/FlipCard';
import { useEffect, useState } from 'react';

const InterviewReview = () => {
  const [review, setReview] = useState({ score: 0, criteria: [] });
  function parseFeedback(obj) {
    const text = JSON.parse(obj);
    const feedback = JSON.parse(text);
    const overallScore = feedback['Overall score'];
    const speechScore = feedback['Speech'];
    const confidenceScore = feedback['Confidence'];
    const technicalSkillsScore = feedback['Technical skills'];
    const areasOfImprovement = feedback['Areas of improvement'];

    setReview({
      score: overallScore * 10,
      criteria: [
        { heading: 'Speech', score: `${speechScore}/10`, bgColor: '#00A4CC', fontSize: 'x-large' },
        { heading: 'Confidence', score: `${confidenceScore}/10`, bgColor: '#FFC107', fontSize: 'x-large' },
        { heading: 'Technical Skills', score: `${technicalSkillsScore}/10`, bgColor: '#8BC34A', fontSize: 'x-large' },
        {
          heading: 'Areas of Improvement',
          score: areasOfImprovement,
          bgColor: '#673AB7',
          fontSize: 'small'
        }
      ]
    });
  }
  useEffect(() => {
    const review = localStorage.getItem('review');
    parseFeedback(review);
  }, []);

  return (
    <div className="p-8 mx-auto space-y-8">
      <Link to="/" className="bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700 transition">
        Back to home
      </Link>
      <p className="text-3xl font-bold text-center text-gray-600">Interview Review</p>

      <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Your Score</h2>
        <div className="flex justify-center items-center space-x-4">
          <p className="text-3xl font-bold text-blue-500">{review.score}%</p>
          <p className="text-lg text-gray-600">You performed above average. Great job!</p>
        </div>
      </div>

      <div className="flex justify-around w-full flex-wrap gap-4">
        {review.criteria.map((item, index) => (
          <>
            <FlipCard
              key={index}
              bgColor={item.bgColor}
              fontSize={item.fontSize}
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
