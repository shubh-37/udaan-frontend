import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';

export default function InterviewInstructions() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(true); // Dialog/Drawer opens on load

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.matchMedia('(max-width: 430px)').matches);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const instructions = (
    <div className="space-y-4 text-gray-700 dark:text-gray-300">
      <p>Follow these instructions carefully before starting the interview:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          The interview will last for <b>5 minutes</b>.
        </li>
        <li>
          Click on the <b>Start</b> button to begin. Our virtual assistant will guide you through the process.
        </li>
        <li>
          For each question:
          <ul className="list-disc pl-5">
            <li>Press the <b>Start Answering</b> button to begin your response.</li>
            <li>After answering, click the <b>Stop Answering</b> button and wait for the next question.</li>
          </ul>
        </li>
        <li>
          Once complete, click <b>Submit</b> to receive your detailed review.
        </li>
        <li>
          After submission, you will receive:
          <ul className="list-disc pl-5">
            <li><b>Your Strengths:</b> Areas where you excelled.</li>
            <li><b>Improvements Needed:</b> Suggestions for enhancement.</li>
            <li><b>Scoring:</b> Performance based on communication, body language, and clarity.</li>
          </ul>
        </li>
        <li>Ensure a <b>quiet</b> and <b>well-lit</b> environment.</li>
      </ul>
    </div>
  );

  const handleClose = () => setIsDialogOpen(false);

  return (
    <div>
      {isSmallScreen ? (
        <Drawer open={isDialogOpen} onOpenChange={handleClose}>
          <DrawerTrigger asChild>
            <button className="hidden">Open Instructions</button>
          </DrawerTrigger>
          <DrawerContent className="bg-white dark:bg-gray-900 p-6 rounded-lg max-h-[80vh] overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle className="dark:text-gray-200">Interview Instructions</DrawerTitle>
            </DrawerHeader>
            {instructions}
            <button
              onClick={handleClose}
              className="mt-4 bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-400 transition w-full"
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
          <DialogContent className="bg-white dark:bg-gray-900 max-w-lg p-6 rounded-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="dark:text-gray-200">Interview Instructions</DialogTitle>
            </DialogHeader>
            {instructions}
            <button
              onClick={handleClose}
              className="mt-4 bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-400 transition w-full"
            >
              Got it!
            </button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
