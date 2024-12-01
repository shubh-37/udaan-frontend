import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Interview from './pages/Interview';
import InterviewReview from './pages/Review';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/review" element={<InterviewReview />} />
      </Routes>
    </div>
  );
}

export default App;
