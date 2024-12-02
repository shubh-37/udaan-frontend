import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'; // Import icons
import InterviewInstructions from '../shared/Instructions';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const recognitionRef = useRef(null);
  const speechSynthesisRef = useRef(window.speechSynthesis);
  const navigate = useNavigate();

  // Speak the current question
  const speakQuestion = () => {
    if (speechSynthesisRef.current.speaking) {
      return; // Prevent overlapping speech
    }

    const utterance = new SpeechSynthesisUtterance('Hello friend');
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
      <div className="relative w-full h-64 bg-gray-200 border-2 border-gray-300 rounded-lg flex justify-center items-center">
        <video ref={videoRef} className="absolute w-full h-full object-cover rounded-lg" muted autoPlay playsInline />
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg transition ${
            isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isListening ? (
            <FaMicrophoneSlash className="text-white text-2xl" />
          ) : (
            <FaMicrophone className="text-white text-2xl" />
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
