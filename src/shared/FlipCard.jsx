import React, { useState } from 'react';

const FlipCard = ({ frontContent, backContent, bgColor, fontSize }) => {
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
            backgroundColor: bgColor,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          className="flex items-center justify-center flex-col rounded-lg w-full h-full text-white"
        >
          {frontContent}
          <p>Click to see the results</p>
        </div>

        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)', // Flip this side
            position: 'absolute',

            height: '100%',
            backgroundColor: '#2C2C2C',
            color: '#fff',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          className="text-center p-2 flex flex-col justify-around items-center w-full object-fit"
        >
          <h3
            style={{
              fontSize: fontSize
            }}
          >
            {backContent}
          </h3>
          <button className="bg-white text-gray-600 w-fit p-2 rounded-lg shadow ">Download report</button>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
