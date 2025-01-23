import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import InterviewInstructions from '../shared/Instructions';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../shared/Loader';
import { Video } from 'lucide-react';

const SpeechToText = () => {
  const { VITE_API_URL } = import.meta.env;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [siriLoader, setSiriLoader] = useState(false);
  const [interviewId, setInterviewId] = useState('');
  const [imageLink, setImageLink] = useState(null);
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const speakQuestion = async (text) => {
    const apiKey = 'sk_051fea9ca0ff140f99b89d38bfd776703e3c1ed0bf9d0ca8';
    const voiceId = 'tSVwqkJGEKjLklhiN0Nx';

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
      setSiriLoader(false);
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
        setSiriLoader(true);
        saveAnswer();
      } else {
        console.log('Transcript is empty, not calling convoWithAI');
      }
    }
  };
  const saveAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers((prev) => [...prev, { question: currentQuestion, answer: transcript }]);
    setTranscript('');
    askNextQuestion();
  };

  const askNextQuestion = () => {
    if (currentQuestionIndex === 0 && !isStart) {
      setIsStart(true);
      setCurrentQuestionIndex(0);
      speakQuestion(questions[0]);
      return;
    }
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      speakQuestion(questions[nextIndex]);
    }
  };

  const getQuestions = async () => {
    try {
      const response = await axios.get(`${VITE_API_URL}/start_interview`, {
        headers: {
          'ngrok-skip-browser-warning': 'ngrok-skip-browser-warning',
          Authorization: `Bearer ${token}`
        }
      });
      setImageLink(response.data.company_logo);
      setQuestions(response.data.questions);
      setInterviewId(response.data.interview_id);
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/login');
      } else {
        alert('Currently facing some issue, sorry for the inconvenience');
        navigate('/');
      }
    }
  };

  async function submitInterview() {
    setIsLoading(true);
    try {
      await axios.post(
        `${VITE_API_URL}/submit_interview`,
        { interview_id: interviewId, qaa: answers },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      localStorage.setItem('interview_id', interviewId);
      navigate('/review');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getQuestions();
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
    <div className="">
      <InterviewInstructions />
      {isLoading && <Loader text={'Processing Interview...'} />}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b justify-between">
        {!imageLink ? (
          <Link className="flex items-center justify-center" to="/">
            <Video className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-2xl font-bold bg-gradient-to-br from-blue-600 via-green-600 to-purple-600 text-transparent bg-clip-text">
              PrepSOM
            </span>
          </Link>
        ) : (
          <img src={imageLink} alt="" height={40} width={80} />
        )}
      </header>
      <main className="px-4 py-2">
        <h1 className="text-3xl font-bold text-center text-gray-600">Mock Interview</h1>
        <div className="flex flex-col items-center gap-4 mt-6">
          {!isStart && (
            <button
              onClick={askNextQuestion}
              disabled={questions.length <= 0}
              className="bg-blue-600 text-white p-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
            >
              {questions.length <= 0 ? (
                <div className="loader border-t-4 border-white border-solid rounded-full w-6 h-6 animate-spin mx-auto"></div>
              ) : (
                'Start'
              )}
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
          <p className="p-2 bg-gray-100 rounded-md text-gray-600">
            Hope you're ready, we wish you all the best! Give us a moment before we begin!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full h-80 bg-gray-200 border-2 border-gray-300 rounded-lg overflow-hidden">
              <video ref={videoRef} className="absolute w-full h-full object-cover" muted autoPlay playsInline />
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

            <div className="flex flex-col items-center mt-4">
              <button
                onClick={isListening ? stopListening : startListening}
                className={` flex items-center justify-center shadow-lg transition text-white rounded p-2 ${
                  isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isListening ? 'Submit' : 'Respond'}
              </button>
              <p className="mt-2 text-gray-600">{isListening ? 'Listening...' : 'Click to start answering.'}</p>
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <textarea
              rows="12"
              className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your speech will appear here..."
              value={transcript}
              readOnly
            />
            <p className="mt-4 p-2 bg-gray-100 rounded-md text-gray-600">
              <span className="font-bold">Important: </span> Please click on <b>Submit</b> only once the transcription
              is done. It takes 2-3 secs to get the response, your patience is appreciated.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SpeechToText;
