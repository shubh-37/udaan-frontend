import { useState, useRef, useEffect } from 'react';
import InterviewInstructions from '../shared/Instructions';
import Loader from '../shared/Loader';
import { EndInterviewDialog } from '@/components/Interview/EndInterviewDialog';
import { Header } from '@/components/Interview/InterviewHeader';
import VideoPanel from '@/components/Interview/VideoPanel';
import { Footer } from '@/components/Interview/InterviewFooter';
import { InterviewQuestionPanel } from '@/components/Interview/InterviewQuestionPanel';

const SpeechToText = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const videoRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [siriLoader, setSiriLoader] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const handleEndInterview = () => {
    setShowEndDialog(true);
  };

  useEffect(() => {
    // speakQuestion('Welcome to the AI Interview. Click on the start button to begin the interview.');
    const initializeVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.log(err);
      }
    };

    initializeVideo();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="">
      <InterviewInstructions />
      {isLoading && <Loader text={'Processing Interview...'} />}
      <Header onEndInterview={handleEndInterview} />
      <div className="px-4 py-2">
        <div className="w-full mx-auto grid max-w-7xl pt-6 gap-6 lg:grid-cols-[1fr,400px]">
          <div className="flex flex-col gap-4">
            <div className="relative w-full h-auto bg-gray-200 border-2 border-gray-300 rounded-lg overflow-hidden">
              <VideoPanel
                ref={videoRef}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
                isOnline={isOnline}
                siriLoader={siriLoader}
              />
            </div>
          </div>

          <InterviewQuestionPanel setSiriLoader={setSiriLoader} />
        </div>
      </div>

      <Footer isOnline={isOnline} />

      <EndInterviewDialog open={showEndDialog} onClose={() => setShowEndDialog(false)} />
    </div>
  );
};

export default SpeechToText;
