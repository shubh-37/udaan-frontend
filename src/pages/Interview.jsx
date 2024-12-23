import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import InterviewInstructions from '../shared/Instructions';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../shared/Loader';
import { Video } from 'lucide-react';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [siriLoader, setSiriLoader] = useState(false);
  const [firstQuestion, setFirstQuestion] = useState('');
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const interview_id = localStorage.getItem('interview_id');
  const speakQuestion = async (text) => {
    const apiKey = 'sk_06c135765482c5e50ba6196783694edf11611a2c3220c61e';
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
        setSiriLoader(true);
        await convoWithAI();
      } else {
        console.log('Transcript is empty, not calling convoWithAI');
      }
    }
  };

  async function askFirstQuestion() {
    try {
      const response = await axios.get('https://udaan-backend.ip-dynamic.org/start_interview', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFirstQuestion(response.data.message);
    } catch (error) {
      if (error.response.status === 422 || error.response.status === 401) {
        navigate('/login');
      } else {
        alert('Currently facing some issue, sorry for the inconvenience');
        navigate('/');
      }
    }
  }
  function speakFirstQuestion() {
    setIsStart(true);
    speakQuestion(firstQuestion);
  }
  async function convoWithAI() {
    try {
      const response = await axios.post(
        `https://udaan-backend.ip-dynamic.org/interview_convo`,
        { response: transcript },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setTranscript('');
      speakQuestion(response.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setSiriLoader(false);
    }
  }

  async function submitInterview() {
    setIsLoading(true);
    try {
      const response = await axios.get('https://udaan-backend.ip-dynamic.org/interview_feedback', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          interview_id
        }
      });
      localStorage.setItem('review', JSON.stringify(response.data));
      navigate('/review');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
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
    askFirstQuestion();
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
        <Link className="flex items-center justify-center" to="/">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-br from-blue-600 via-green-600 to-purple-600 text-transparent bg-clip-text">
            PrepSOM
          </span>
        </Link>
      </header>
      <main className="px-4 py-2">
        <h1 className="text-3xl font-bold text-center text-gray-600">Mock Interview</h1>
        <div className="flex flex-col items-center gap-4 mt-6">
          {!isStart && (
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
              <span className="font-bold">Important: </span> Please mute the mic only once the transcription is done. It
              takes 2-3 secs to get the response, your patience is appreciated.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SpeechToText;
