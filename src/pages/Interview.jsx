import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'; // Import icons
import InterviewInstructions from '../shared/Instructions';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const recognitionRef = useRef(null);
  const speechSynthesisRef = useRef(window.speechSynthesis);
  const navigate = useNavigate();
  const thread_id = localStorage.getItem('thread_id');

  // Speak the current question
  const speakQuestion = (text) => {
    if (speechSynthesisRef.current.speaking) {
      return; // Prevent overlapping speech
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.onend = () => {
      console.log('Finished speaking');
    };
    speechSynthesisRef.current.speak(utterance);
  };

  // Start listening
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

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsListening(false);
    }
  };

  async function askFirstQuestion() {
    setIsStart(true);
    try {
      const response = await axios.get(
        'http://ec2-3-110-37-239.ap-south-1.compute.amazonaws.com:8000/start_interview',
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
        `http://ec2-3-110-37-239.ap-south-1.compute.amazonaws.com:8000/start_interview`,
        { response: 'my name is shubh' },
        {
          params: {
            thread_id
          }
        }
      );
      speakQuestion(response.data.message);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function submitInterview() {
    try {
      const response = await axios.get(
        'http://ec2-3-110-37-239.ap-south-1.compute.amazonaws.com:8000/interview_feedback',
        {
          params: {
            thread_id
          }
        }
      );
      console.log(response);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
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
      <h1 className="text-3xl font-bold text-center text-gray-600">Mock Interview</h1>
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
