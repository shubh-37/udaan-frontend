import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

export default function InterviewInstructions() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(true); // Dialog/Drawer is open on page load

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.matchMedia('(max-width: 430px)').matches);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const instructions = (
    <div className="space-y-4 text-gray-700">
      <p>Follow these instructions carefully before starting the interview:</p>
      <ul className="list-disc pl-5">
        <li>
          The interview will last for <b>5 minutes</b>.
        </li>
        <li>
          Click on the <b>Start</b> button to begin. Our virtual assistant will guide you through the process.
        </li>
        <li>
          For each question:
          <ul className="list-disc pl-5">
            <li>
              Press the <b>Start Answering</b> button to begin your response.
            </li>
            <li>
              After completing your answer, click the <b>Stop Answering</b> button and wait for the next question.
            </li>
          </ul>
        </li>
        <li>
          Once the interview is complete, click on the <b>Submit</b> button to receive your detailed review.
        </li>
        <li>
          After submission, you will receive:
          <ul className="list-disc pl-5">
            <li>
              <b>Your Strengths:</b> Areas where you excelled.
            </li>
            <li>
              <b>Improvements Needed:</b> Suggestions for enhancement.
            </li>
            <li>
              <b>Scoring:</b> Your performance metrics based on communication, body language, and clarity.
            </li>
          </ul>
        </li>
        <li>
          Ensure a <b>quiet</b> and <b>well-lit</b> environment for the best experience.
        </li>
      </ul>
    </div>
  );

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      {isSmallScreen ? (
        <Drawer open={isDialogOpen} onOpenChange={handleClose}>
          <DrawerTrigger asChild>
            <button className="hidden">Open Instructions</button>
          </DrawerTrigger>
          <DrawerContent className="bg-background p-6 rounded-lg">
            <DrawerHeader>
              <DrawerTitle>Interview Instructions</DrawerTitle>
            </DrawerHeader>
            {instructions}
            <button
              onClick={handleClose}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition w-full"
            >
              Got it!
            </button>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={handleClose}>
          <DialogTrigger asChild>
            <button className="hidden">Open Instructions</button>
          </DialogTrigger>
          <DialogContent className="bg-background max-w-lg p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle>Interview Instructions</DialogTitle>
              <DialogDescription>{instructions}</DialogDescription>
            </DialogHeader>
            <button
              onClick={handleClose}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition w-full"
            >
              Got it!
            </button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
