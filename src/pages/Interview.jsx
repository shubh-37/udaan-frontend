import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState(''); // Stores the transcribed text
  const [isListening, setIsListening] = useState(false); // Tracks listening state
  const [error, setError] = useState(''); // Tracks errors
  const videoRef = useRef(null); // Reference to the video element
  const [isVideoReady, setIsVideoReady] = useState(false); // Tracks video readiness
  const mediaStreamRef = useRef(null); // Reference to the video stream
  const recognitionRef = useRef(null); // Reference to SpeechRecognition instance
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current question index
  const speechSynthesisRef = useRef(window.speechSynthesis); // Reference to speech synthesis
  const navigate = useNavigate();

  // Dummy array of questions
  const questions = [
    'What are your strengths?',
    'Why do you want this job?',
    'Can you describe a challenging situation and how you handled it?',
    'What are your long-term career goals?',
    'How do you handle stress or pressure?'
  ];

  // Speak the current question
  const speakQuestion = () => {
    if (speechSynthesisRef.current.speaking) {
      return; // Prevent overlapping speech
    }

    const utterance = new SpeechSynthesisUtterance(questions[currentIndex]);
    utterance.lang = 'en-US';
    utterance.onend = () => {
      console.log('Finished speaking');
    };
    speechSynthesisRef.current.speak(utterance);
  };

  // Start listening
  const startListening = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true; // Enable continuous listening
    recognition.interimResults = true; // Get real-time transcription
    recognition.lang = 'en-IN'; // Use Indian English

    recognition.onstart = () => {
      setError('');
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          setTranscript((prev) => prev + result[0].transcript + ' ');
        } else {
          interimTranscript += result[0].transcript;
        }
      }
    };

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsListening(false);
    }
  };

  useEffect(() => {
    const initializeVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        mediaStreamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.muted = true; // Ensure the video is muted
          videoRef.current.playsInline = true; // Important for mobile browsers
          await videoRef.current.play(); // Explicitly play the video
          setIsVideoReady(true);
        }
      } catch (err) {
        setError('Unable to access the camera. Please allow camera permissions.');
        console.error(err);
      }
    };

    initializeVideo();
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Handle "Next Question" button click
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      speakQuestion();
    } else {
      navigate('/review');
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">Mock Interview</h1>
      <div className="text-center space-y-4">
        <button
          onClick={handleNextQuestion}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          {currentIndex === 0 ? 'Start' : currentIndex === questions.length - 1 ? 'Submit' : 'Next Question'}
        </button>
      </div>
      <div className="relative w-full h-64 bg-gray-200 border-2 border-gray-300 rounded-lg flex justify-center items-center">
        {isVideoReady ? (
          <video ref={videoRef} className="absolute w-full h-full object-cover rounded-lg" muted autoPlay playsInline />
        ) : (
          <p className="text-gray-500">Loading video...</p>
        )}
      </div>

      <div className="space-y-4">
        <p className="text-lg text-center text-gray-700">
          {isListening ? 'Listening...' : "Click 'Start Listening' to begin."}
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={startListening}
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
            disabled={isListening}
          >
            Start Listening
          </button>
          <button
            onClick={stopListening}
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition"
            disabled={!isListening}
          >
            Stop Listening
          </button>
        </div>
        <textarea
          rows="6"
          className="w-full h-28 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your speech will appear here..."
          value={transcript}
          readOnly
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default SpeechToText;
