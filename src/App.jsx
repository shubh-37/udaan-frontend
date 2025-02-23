import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Interview from './pages/Interview';
import InterviewReview from './pages/Review';
import SignupForm from './pages/Signup';
import LoginForm from './pages/Login';
import RequiresAuth from './shared/RequiresAuth';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import AptitudeExam from './pages/Aptitude';
import InterviewReport from './pages/Report';
import Profile from './pages/Profile';

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
              <InterviewReport />
            </RequiresAuth>
          }
        />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/aptitude' element={<AptitudeExam/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path="/blogs/:id" element={<BlogPost/>}/>
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
