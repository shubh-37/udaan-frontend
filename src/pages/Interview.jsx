import { useState, useRef, useEffect, useContext, useCallback, useMemo } from 'react';
import InterviewInstructions from '../shared/Instructions';
import Loader from '../shared/Loader';
import { EndInterviewDialog } from '@/components/Interview/EndInterviewDialog';
import { Header } from '@/components/Interview/InterviewHeader';
import { Footer } from '@/components/Interview/InterviewFooter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Mic, Square, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { interviewContext } from '@/context/InterviewContextProvider';
import { TextAnimate } from '@/components/magicui/text-animate';
import RecordRTC from 'recordrtc';

const TOTAL_QUESTIONS = 10;

const SpeechToText = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [siriLoader, setSiriLoader] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [isStart, setIsStart] = useState(false);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);

  const { questions, setQuestions } = useContext(interviewContext);
  const { startInterview, textToSpeech, submitInterview, transcribeResponse } = useContext(interviewContext);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const videoref = useRef(null);
  const questionRef = useRef(false);
  const recorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioRef = useRef(new Audio());
  const currentAudioUrlRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getQuestions = async () => {
      if (questionRef.current) return;
      console.log('called');
      try {
        questionRef.current = true;
        const response = await startInterview();
        setQuestions(response.questions);
        console.log(response);
        console.log(questions);
      } catch (error) {
        if (error?.response?.status === 401) {
          navigate('/login');
        } else if (error?.response?.status === 422) {
          alert(error?.response?.data?.detail);
        } else {
          toast('Currently facing some issue, sorry for the inconvenience');
          // navigate('/');
        }
      }
    };
    getQuestions();
  }, []);

  useEffect(() => {
    const initializeVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoref.current) {
          videoref.current.srcObject = stream;
          await videoref.current.play();
        }
      } catch (err) {
        toast.error('Error accessing camera');
      }
    };

    initializeVideo();

    return () => {
      if (videoref.current?.srcObject) {
        videoref.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleStartInterview = async () => {
    try {
      setSiriLoader(true);
      askNextQuestion();
      setIsInterviewStarted(true);
      setIsStart(true);
    } catch (error) {
      toast.error('Error starting interview');
    }
  };

  const speakQuestion = async (text) => {
    try {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      if (currentAudioUrlRef.current) {
        URL.revokeObjectURL(currentAudioUrlRef.current);
      }

      const response = await textToSpeech(text);
      const audioUrl = URL.createObjectURL(response);
      currentAudioUrlRef.current = audioUrl;
      audioRef.current.src = audioUrl;

      setIsAssistantSpeaking(true);

      audioRef.current.play();
      setSiriLoader(false);

      audioRef.current.onended = () => {
        setIsAssistantSpeaking(false);
      };

    } catch (error) {
      toast('Error in speakQuestion:', {
        description: error.message || ''
      });
      setIsAssistantSpeaking(false);
    }
  };

  const askNextQuestion = () => {
    if (!questions.length) return;

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      speakQuestion(questions[nextIndex].question);
    }
  };

  const handleStartRecording = async () => {
    if (!isOnline) {
      toast('No internet connection', {
        description: 'Please check your connection and try again.'
      });
      return;
    }

    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaStreamRef.current = audioStream;

      recorderRef.current = new RecordRTC(audioStream, {
        type: 'audio',
        mimeType: 'audio/wav',
        recorderType: RecordRTC.StereoAudioRecorder,
        numberOfAudioChannels: 1,
        sampleRate: 44100
      });

      recorderRef.current.startRecording();
      setIsRecording(true);
    } catch (error) {
      toast('Error accessing microphone:', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  const handleStopRecording = () => {
    if (!recorderRef.current) return;
  
    setIsRecording(false);
  
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    recorderRef.current.stopRecording(async () => {
      const audioBlob = recorderRef.current.getBlob();
      
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      
      try {
        await transcribeResponse(formData, questions[currentQuestionIndex].question_id);
        askNextQuestion();
      } catch (error) {
        toast('Error uploading audio:', {
          description: error.message || 'Unknown error occurred'
        });
      }
    });
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const interviewId = localStorage.getItem('interview_id');
      const interviewData = await submitInterview(interviewId);
      localStorage.setItem(`interview_review_data_${interviewId}`, JSON.stringify(interviewData));
      navigate('/review');
    } catch (error) {
      toast('Error', {
        description: 'An error occurred while submitting the interview. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setIsRecording(false);
    toast('Response cleared', {
      description: 'You can now record a new response.'
    });
  };

  const handleEndInterview = () => {
    setShowEndDialog(true);
  };

  const progress = useMemo(() => {
    return ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;
  }, [currentQuestionIndex]);

  const currentQuestion =
    currentQuestionIndex >= 0 && questions[currentQuestionIndex]?.question ? (
      questions[currentQuestionIndex].question
    ) : (
      <Spinner key="ellipsis" variant="ellipsis" />
    );

  console.log(questions);

  return (
    <div className="">
      <InterviewInstructions />
      {isLoading && <Loader text={'Processing Interview...'} />}
      <Header onEndInterview={handleEndInterview} />
      <div className="px-4 py-2">
        <div className="w-full mx-auto grid max-w-7xl pt-6 gap-6 lg:grid-cols-[1fr,400px]">
          <div className="flex flex-col gap-4">
            <div className="relative w-full h-auto bg-background border-2 border-gray-200 dark:border-gray-900 rounded-lg overflow-hidden">
              <div className="p-4 flex flex-col gap-4">
                <div className="relative w-full h-[200px] sm:h-[300px] md:h-[500px] bg-background border-2 border-gray-50 rounded-lg overflow-hidden">
                  <video ref={videoref} className="absolute w-full h-full object-cover" muted autoPlay playsInline />
                  {siriLoader && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-32 h-8">
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
                  {isRecording && (
                    <motion.div
                      className="absolute top-4 right-4 flex items-center gap-2 bg-black text-white text-sm px-3 py-1 rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: 'reverse',
                        duration: 2
                      }}
                    >
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      Audio Active
                    </motion.div>
                  )}
                </div>

                <div className="flex gap-2 justify-center">
                  {!isRecording ? (
                    <Button onClick={handleStartRecording} 
                    disabled={isAssistantSpeaking || isLoading}className="w-full dark:bg-white">
                      <Mic className="mr-2 h-4 w-4" />
                      Start Response
                    </Button>
                  ) : (
                    <>
                      <Button variant="destructive" onClick={handleStopRecording} className="w-full">
                        <Square className="mr-2 h-4 w-4" />
                        Stop Recording
                      </Button>
                      <Button variant="outline" onClick={handleRestart}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>

                <div className="text-sm text-center text-muted-foreground">
                  {isRecording ? 'Recording in progress...' : 'Ready to record'}
                </div>
              </div>
            </div>
          </div>

          <Card className="space-y-6 border p-4 rounded-lg h-auto flex flex-col items-start">
            <div className="flex justify-between w-full items-center text-sm text-muted-foreground">
              <span>
                Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} />

            <div className="flex flex-col flex-grow border space-y-2 rounded-md text-foreground bg-background w-full p-4">
              <h2 className="text-xl font-semibold">Current Question</h2>
              <p className="text-lg flex justify-center items-center flex-grow break-words hyphens-auto">
                {currentQuestion}
              </p>
            </div>

            <div className="space-y-1 border rounded-md text-foreground bg-background w-full p-4">
              <h3 className="font-medium text-gray-600">Response Guidelines</h3>
              <ul className="space-y-0.5 text-sm text-gray-600 list-disc pl-4">
                <li>Keep responses under 2 minutes</li>
                <li>Use specific examples</li>
                <li>Structure: Situation, Task, Action, Result</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              {!isStart && (
                <Button
                  variant="primary"
                  onClick={handleStartInterview}
                  disabled={questions.length <= 0}
                  className="bg-blue-600 text-white p-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
                >
                  {questions.length <= 0 ? (
                    <div className="loader border-t-4 border-white border-solid rounded-full w-6 h-6 animate-spin mx-auto"></div>
                  ) : (
                    'Start Interview'
                  )}
                </Button>
              )}
              {isStart && (
                <Button
                  variant="primary"
                  onClick={submit}
                  className="bg-blue-600 text-white p-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer w-full gap-2"
                >
                  Submit Interview
                </Button>
              )}
              <div className="flex flex-col justify-start">
                <p className="mt-4 p-2 bg-background border rounded-md text-foreground">
                  <span className="font-bold">Important: </span> Please click on <b>Submit</b> only once the
                  transcription is done. It takes a few seconds to get the response, your patience is appreciated.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* <Footer isOnline={isOnline} /> */}

      <EndInterviewDialog open={showEndDialog} onClose={() => setShowEndDialog(false)} />
    </div>
  );
};

export default SpeechToText;
