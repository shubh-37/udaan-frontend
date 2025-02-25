// components/VideoPanel.tsx
'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, Square, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const VideoPanel = forwardRef(function VideoPanel({ isRecording, setIsRecording, isOnline, siriLoader }, ref) {
const mediaRecorderRef = useRef(null);
const recordedChunksRef = useRef(null);

  const handleStartRecording = async () => {
    if (!isOnline) {
      toast('No internet connection', {
        variant: 'destructive',
        description: 'Please check your connection and try again.'
      });
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      recordedChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      toast('Error accessing microphone:', {
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
        recordedChunksRef.current = [];

        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');

        try {
          const response = await axios.post(`https://localhost:8000/transcribe`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            }
          });
          setTranscript(response.data.transcript);
          toast('Response recorded', {
            description: 'Your response has been saved successfully.'
          });
        } catch (error) {
          toast('Error uploading audio:', {
            description: error instanceof Error ? error.message : "Unknown error occurred"
          });
        } finally {
          setIsRecording(false);
        }
      };
    }
  };

  const handleRestart = () => {
    setIsRecording(false);
    toast('Response cleared', {
      description: 'You can now record a new response.'
    });
  };

  return (
    <Card className="p-4 flex flex-col gap-4">
      <div className="relative w-full h-[500px] bg-background border-2 border-gray-50 rounded-lg overflow-hidden">
        <video ref={ref} className="absolute w-full h-full object-cover" muted autoPlay playsInline />
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
          <Button onClick={handleStartRecording} className="w-full dark:bg-white">
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
    </Card>
  );
});

VideoPanel.displayName = 'VideoPanel';

export default VideoPanel;
