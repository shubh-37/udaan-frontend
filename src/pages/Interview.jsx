import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import InterviewInstructions from '../shared/Instructions';
import { useNavigate } from 'react-router-dom';
import Loader from '../shared/Loader';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer in seconds
  const [siriLoader, setSiriLoader] = useState(false); // Controls Siri-like loader
  const [firstQuestion, setFirstQuestion] = useState(''); // Store the first question
  const timerRef = useRef(null);
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const thread_id = localStorage.getItem('thread_id');

  const speakQuestion = async (text) => {
    const apiKey = 'sk_48b91956819fd998c19873b905715d27733f9dbf090478fd';
    const voiceId = 'P1bg08DkjqiVEzOn76yG';

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch audio data from ElevenLabs API');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('Error in speakQuestion:', error);
    }
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
        setSiriLoader(true); // Show Siri-like loader
        await convoWithAI();
      } else {
        console.log('Transcript is empty, not calling convoWithAI');
      }
    }
  };

  async function askFirstQuestion() {
    try {
      const response = await axios.get('https://udaan-backend.ip-dynamic.org/start_interview', {
        params: {
          thread_id
        }
      });
      setFirstQuestion(response.data.message); // Store the first question
    } catch (error) {
      console.error('Error fetching first question:', error);
    }
  }
  function speakFirstQuestion() {
    setIsStart(true);
    startTimer();
    speakQuestion(firstQuestion);
  }
  async function convoWithAI() {
    try {
      const response = await axios.post(
        `https://udaan-backend.ip-dynamic.org/interview_convo`,
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
    } finally {
      setSiriLoader(false); // Hide Siri-like loader when done
    }
  }

  async function submitInterview() {
    clearInterval(timerRef.current); // Stop the timer
    setIsLoading(true); // Show loader
    try {
      const response = await axios.get('https://udaan-backend.ip-dynamic.org/interview_feedback', {
        params: {
          thread_id
        }
      });
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
    askFirstQuestion();
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
        <>
          <button
            onClick={speakFirstQuestion}
            disabled={firstQuestion.length <= 0}
            className="bg-blue-600 text-white p-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
          >
            {firstQuestion.length <= 0 ? (
              <div className="loader border-t-4 border-white border-solid rounded-full w-6 h-6 animate-spin mx-auto"></div>
            ) : (
              'Start'
            )}
          </button>
          <p className="p-2 bg-gray-100 rounded-md text-gray-600">
            Hope you're ready, we wish you all the best! Give us a moment before we begin!
          </p>
        </>
      )}
      {isStart && (
        <button
          onClick={submitInterview}
          className="bg-blue-600 text-white p-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
        >
          Submit Interview
        </button>
      )}
      <div className="relative w-full h-80 bg-gray-200 border-2 border-gray-300 rounded-lg flex justify-center items-center">
        <video ref={videoRef} className="absolute w-full h-full object-cover rounded-lg" muted autoPlay playsInline />
        {siriLoader && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8">
            <div className="w-full h-full flex items-center justify-around">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-full bg-blue-600 rounded animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          </div>
        )}
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

        <p className="w-full p-2 bg-gray-100 rounded-md text-gray-600 ">
          <span className="font-bold">Important: </span> Please mute the mic only once the transcription is done. It
          takes 2-3 secs to get the response, your patience is appreciated.
        </p>
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
