import React from 'react';

const InterviewReview = () => {
  const reviewData = {
    score: 85, // Percentage score
    strengths: [
      'Great confidence and body language.',
      'Answered technical questions concisely and accurately.',
      'Good use of examples to support answers.'
    ],
    improvements: [
      'Need to improve on behavioral questions, like STAR methodology.',
      "Avoid filler words like 'umm', 'you know'.",
      'Could provide more specific examples in leadership-related questions.'
    ],
    detailedReview: `Overall, you did a great job! Your technical knowledge and confidence stood out. 
      However, you need to work on structuring your answers better for behavioral questions. 
      Practice using the STAR method and focus on removing filler words.`
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">Interview Review</h1>

      {/* Score Section */}
      <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Score</h2>
        <div className="flex justify-center items-center space-x-4">
          <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex justify-center items-center">
            <p className="text-3xl font-bold text-blue-500">{reviewData.score}%</p>
          </div>
          <p className="text-lg text-gray-600">You performed above average. Great job!</p>
        </div>
      </div>

      {/* Strengths Section */}
      <div className="bg-green-50 shadow-md p-6 rounded-lg border border-green-300">
        <h2 className="text-xl font-bold text-green-700 mb-4">Strengths</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {reviewData.strengths.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      {/* Improvements Section */}
      <div className="bg-red-50 shadow-md p-6 rounded-lg border border-red-300">
        <h2 className="text-xl font-bold text-red-700 mb-4">Improvements Needed</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {reviewData.improvements.map((improvement, index) => (
            <li key={index}>{improvement}</li>
          ))}
        </ul>
      </div>

      {/* Detailed Review Section */}
      <div className="bg-gray-100 shadow-md p-6 rounded-lg border border-gray-300">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Detailed Review</h2>
        <p className="text-gray-700 leading-relaxed">{reviewData.detailedReview}</p>
      </div>
    </div>
  );
};

export default InterviewReview;
