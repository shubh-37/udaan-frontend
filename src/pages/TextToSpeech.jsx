import React, { useState, useEffect, useRef } from 'react';

const SpeechToTextWithAI = () => {
  const [transcript, setTranscript] = useState(''); // Stores the transcribed text
  const [isListening, setIsListening] = useState(false); // Tracks listening state
  const [error, setError] = useState(''); // Tracks errors
  const [aiVoice, setAiVoice] = useState(''); // Text for AI Voice
  const videoRef = useRef(null); // Reference to the video element
  const [isVideoReady, setIsVideoReady] = useState(false); // Tracks video readiness
  const mediaStreamRef = useRef(null); // Reference to the video stream
  const recognitionRef = useRef(null); // Reference to SpeechRecognition instance
  const speechSynthesisRef = useRef(window.speechSynthesis); // Speech Synthesis reference

  // Start listening
  const startListening = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

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
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsListening(false);
    }
  };

  // Initialize dummy video stream
  useEffect(() => {
    const initializeVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play(); // Play the video explicitly
          setIsVideoReady(true);
        }
      } catch (err) {
        setError('Unable to access the camera. Please allow camera permissions.');
      }
    };

    initializeVideo();

    return () => {
      // Cleanup video stream on unmount
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Speak using AI voice
  const speak = (text) => {
    if (!speechSynthesisRef.current) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1; // Adjust pitch (range: 0 to 2)
    utterance.rate = 1; // Adjust rate (range: 0.1 to 10)
    utterance.volume = 1; // Adjust volume (range: 0 to 1)

    // Select a specific voice if needed
    const voices = speechSynthesisRef.current.getVoices();
    utterance.voice = voices.find((voice) => voice.name === 'Google US English') || voices[0];

    speechSynthesisRef.current.speak(utterance);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">Speech to Text with AI Voice</h1>

      {/* Video Section */}
      <div className="relative w-full h-64 bg-gray-200 border-2 border-gray-300 rounded-lg flex justify-center items-center">
        {isVideoReady ? (
          <video ref={videoRef} className="absolute w-full h-full object-cover rounded-lg" muted autoPlay />
        ) : (
          <p className="text-gray-500">Loading video...</p>
        )}
      </div>

      {/* Speech-to-Text Section */}
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
          className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your speech will appear here..."
          value={transcript}
          readOnly
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>

      {/* AI Voice Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">AI Voice Interaction</h2>
        <textarea
          rows="3"
          className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type something for AI to say..."
          value={aiVoice}
          onChange={(e) => setAiVoice(e.target.value)}
        />
        <button
          onClick={() => speak(aiVoice)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Speak
        </button>
      </div>
    </div>
  );
};

export default SpeechToTextWithAI;
