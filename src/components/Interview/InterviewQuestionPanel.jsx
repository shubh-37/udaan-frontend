import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { interviewContext } from '@/context/InterviewContextProvider';
import { toast } from 'sonner';

const TOTAL_QUESTIONS = 10;

export function InterviewQuestionPanel({ setSiriLoader }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { submitInterview, textToSpeech, questions, startInterview, setQuestions, setImageLink } =
    useContext(interviewContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (questions.length === 0) {
      getQuestions();
    }
    speakQuestion('Welcome to the AI Interview. Click on the start button to begin the interview.');
  }, []);

  const saveAnswer = () => {
    const currentQuestion =
      questions.length > 0 ? (
        typeof questions[currentQuestionIndex] === 'string' ? (
          questions[currentQuestionIndex]
        ) : (
          questions[currentQuestionIndex]?.question || 'Loading question...'
        )
      ) : (
        <Spinner key="ellipsis" variant="ellipsis" />
      );
    askNextQuestion();
  };

  const speakQuestion = async (text) => {
    try {
      const response = await textToSpeech(text);
      const audioUrl = URL.createObjectURL(response);
      const audio = new Audio(audioUrl);

      audio.play();
      setSiriLoader(false);
    } catch (error) {
      toast('Error in speakQuestion:', {
        variant: 'destructive',
        description: error.message || ''
      });
    }
  };

  const askNextQuestion = () => {
    if (currentQuestionIndex === 0 && !isStart) {
      setIsStart(true);
      speakQuestion(questions[0]);
      return;
    }
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      speakQuestion(questions[nextIndex]);
    }
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      await submitInterview(localStorage.getItem('interview_id'));
      navigate('/review');
    } catch (error) {
      alert('An error occurred while submitting the interview. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getQuestions = async () => {
    try {
      const response = await startInterview();
      setImageLink(response.company_logo);
      setQuestions(response.questions);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate('/login');
      } else if (error?.response?.status === 422) {
        alert(error?.response?.data?.detail);
      } else {
        alert('Currently facing some issue, sorry for the inconvenience');
        navigate('/');
      }
    }
  };

  const progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;
  const currentQuestion =
    questions.length > 0 ? questions[currentQuestionIndex] : <Spinner key="ellipsis" variant="ellipsis" />;

  return (
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
        <p className="text-lg flex justify-center items-center flex-grow">{currentQuestion}</p>
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
            onClick={askNextQuestion}
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
            <span className="font-bold">Important: </span> Please click on <b>Submit</b> only once the transcription is
            done. It takes a few seconds to get the response, your patience is appreciated.
          </p>
        </div>
      </div>
    </Card>
  );
}
