import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Interview from './pages/Interview';
import InterviewReview from './pages/Review';
import SignupForm from './pages/Signup';
import LoginForm from './pages/Login';
import RequiresAuth from './shared/RequiresAuth';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/interview"
          element={
            <RequiresAuth>
              <Interview />
            </RequiresAuth>
          }
        />
        <Route
          path="/review"
          element={
            <RequiresAuth>
              <InterviewReview />
            </RequiresAuth>
          }
        />
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
