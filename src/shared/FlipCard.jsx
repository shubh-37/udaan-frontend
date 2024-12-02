import React, { useState } from 'react';

const FlipCard = ({ frontContent, backContent, bgColor }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="w-60 h-60 relative cursor-pointer"
      style={{ perspective: '1000px' }} // Perspective for the 3D effect
      onClick={handleFlip}
    >
      {/* Flipping container */}
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
            width: '100%',
            height: '100%',
            backgroundColor: bgColor,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          {frontContent}
        </div>

        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)', // Flip this side
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#2C2C2C',
            color: '#fff',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          className="text-center p-2 flex flex-col justify-around items-center "
        >
          <h3 className="text-2xl">{backContent}</h3>
          <button className="bg-white text-gray-600 w-fit p-2 rounded-lg shadow ">Download report</button>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
