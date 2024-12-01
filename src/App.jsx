import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Interview from './pages/Interview';
import SpeechToTextWithAI from './pages/TextToSpeech';
import InterviewReview from './pages/Review';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/test" element={<SpeechToTextWithAI />} />
        <Route path="/review" element={<InterviewReview />} />
      </Routes>
    </div>
  );
}

export default App;
