import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'; // Import icons
import InterviewInstructions from '../shared/Instructions';
import { useNavigate } from 'react-router-dom';
import Loader from '../shared/Loader';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer in seconds
  const timerRef = useRef(null); // Timer reference
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const recognitionRef = useRef(null);
  const speechSynthesisRef = useRef(window.speechSynthesis);
  const navigate = useNavigate();

  const thread_id = localStorage.getItem('thread_id');

  const speakQuestion = (text) => {
    if (speechSynthesisRef.current.speaking) {
      return; // Prevent overlapping speech
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onend = () => {
      console.log('Finished speaking');
    };
    speechSynthesisRef.current.speak(utterance);
  };

  const startListening = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      return;
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
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

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsListening(false);

      if (transcript.trim()) {
        await convoWithAI();
      } else {
        console.log('Transcript is empty, not calling convoWithAI');
      }
    }
  };

  async function askFirstQuestion() {
    setIsStart(true);
    startTimer();
    try {
      const response = await axios.get(
        'https://ec2-3-110-37-239.ap-south-1.compute.amazonaws.com:8000/start_interview',
        {
          params: {
            thread_id
          }
        }
      );
      speakQuestion(response.data.message);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  async function convoWithAI() {
    try {
      const response = await axios.post(
        `https://ec2-3-110-37-239.ap-south-1.compute.amazonaws.com:8000/interview_convo`,
        { response: transcript },
        {
          params: {
            thread_id
          }
        }
      );
      setTranscript(''); // Clear the transcript for the next question
      speakQuestion(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  async function submitInterview() {
    clearInterval(timerRef.current); // Stop the timer
    setIsLoading(true); // Show loader
    try {
      const response = await axios.get(
        'https://ec2-3-110-37-239.ap-south-1.compute.amazonaws.com:8000/interview_feedback',
        {
          params: {
            thread_id
          }
        }
      );
      localStorage.setItem('review', JSON.stringify(response.data.message)); // Save the review in local storage
      navigate('/review'); // Route to the review page
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false); // Hide loader
    }
  }

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current); // Stop the timer
          submitInterview(); // Auto-submit when time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const initializeVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        mediaStreamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.muted = true;
          videoRef.current.playsInline = true;
          await videoRef.current.play();
        }
      } catch (err) {
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

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <InterviewInstructions />
      {isLoading && <Loader text={'Processing Interview...'} />}
      <h1 className="text-3xl font-bold text-center text-gray-600">Mock Interview</h1>
      <div className="text-center text-xl font-semibold text-gray-700">Time Left: {formatTime(timeLeft)}</div>
      {!isStart && (
        <button
          onClick={askFirstQuestion}
          className="bg-blue-600 text-white p-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
        >
          Start
        </button>
      )}
      {isStart && (
        <button
          onClick={submitInterview}
          className="bg-blue-600 text-white p-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
        >
          Submit Interview
        </button>
      )}
      <div className="relative w-full h-64 bg-gray-200 border-2 border-gray-300 rounded-lg flex justify-center items-center">
        <video ref={videoRef} className="absolute w-full h-full object-cover rounded-lg" muted autoPlay playsInline />
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg transition ${
            isListening ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {isListening ? (
            <FaMicrophone className="text-white text-2xl" />
          ) : (
            <FaMicrophoneSlash className="text-white text-2xl" />
          )}
        </button>
        <p className="mt-2 text-gray-600">{isListening ? 'Listening...' : 'Tap the mic to start answering.'}</p>
      </div>

      <textarea
        rows="6"
        className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Your speech will appear here..."
        value={transcript}
        readOnly
      />
    </div>
  );
};

export default SpeechToText;
