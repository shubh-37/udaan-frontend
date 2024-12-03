import { useEffect, useState } from 'react';

const BottomSheet = ({ isOpen, onClose, children, title = 'Bottom Sheet' }) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Detect if the keyboard is open (based on viewport height changes)
      if (window.innerHeight < document.documentElement.clientHeight) {
        setIsKeyboardOpen(true);
      } else {
        setIsKeyboardOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose} // Close the sheet when clicking the overlay
      ></div>

      {/* Bottom Sheet Content */}
      <div
        className={`relative w-full bg-white rounded-t-lg transition-transform ${
          isKeyboardOpen ? 'translate-y-0' : ''
        }`}
        style={{
          maxHeight: '90%'
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the sheet from closing it
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            Close
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default BottomSheet;
