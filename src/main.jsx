import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './context/AuthContextProvider.jsx';
import './index.css';
import App from './App.jsx';
import AptitudeProvider from './context/AptitudeContextProvider.jsx';
import InterviewProvider from './context/InterviewContextProvider.jsx';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from './context/ThemeContextProvider.jsx';
import ProfileProvider from './context/ProfileContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <ProfileProvider>
            <AptitudeProvider>
              <InterviewProvider>
                <App />
                <Toaster />
              </InterviewProvider>
            </AptitudeProvider>
          </ProfileProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  // </StrictMode>
);