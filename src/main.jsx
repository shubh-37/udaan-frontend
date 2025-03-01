import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './context/AuthContextProvider.jsx';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './components/theme-provider';
import AptitudeProvider from './context/AptitudeContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <AptitudeProvider>
            <App />
          </AptitudeProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
