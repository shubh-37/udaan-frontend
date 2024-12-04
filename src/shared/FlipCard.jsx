import { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const FlipCard = ({ frontContent, backContent, fontSize, rating }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const emptyStars = 5 - fullStars; // Number of empty stars
    return (
      <div className="flex justify-center items-center space-x-1 mt-4">
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <FaStar key={`full-${index}`} className="text-yellow-500 text-3xl" />
          ))}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <FaRegStar key={`empty-${index}`} className="text-yellow-500 text-3xl" />
          ))}
      </div>
    );
  };

  return (
    <div
      className="w-72 h-72 relative cursor-pointer"
      style={{ perspective: '1000px' }} // Perspective for the 3D effect
      onClick={handleFlip}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s ease'
        }}
      >
        <div
          style={{
            backfaceVisibility: 'hidden',
            position: 'absolute',
            backgroundColor: '#929292',
            border: '3px solid #919191'
          }}
          className="flex items-center shadow-md justify-center flex-col rounded-3xl w-full h-full text-white text-2xl text-center"
        >
          {frontContent}
          <p className="text-base">Click to see the results</p>
        </div>

        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)', // Flip this side
            position: 'absolute',
            height: '100%',
            backgroundColor: '#2C2C2C'
          }}
          className="text-center p-2 flex shadow-md flex-col justify-around items-center w-full object-fit rounded-3xl text-white"
        >
          <h3
            style={{
              fontSize: fontSize
            }}
          >
            {backContent}
          </h3>
          {/* Render the stars */}
          {rating && renderStars(rating)}
          <button className="bg-white text-gray-600 w-fit p-2 rounded-lg shadow mt-2">Download report</button>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
