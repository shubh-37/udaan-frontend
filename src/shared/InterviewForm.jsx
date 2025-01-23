import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import InterviewFormContent from './InterviewFormContent';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../components/ui/sheet';
import { authContext } from '../context/AuthContextProvider';
export default function InterviewForm({ isOpen, setIsOpen }) {
  const { VITE_API_URL } = import.meta.env;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { setUpdateProfile } = useContext(authContext);
  const [formData, setFormData] = useState({
    job_role: '',
    institute: '',
    yrs_of_exp: 0
  });
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.matchMedia('(max-width: 430px)').matches);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${VITE_API_URL}/profile`, {
          headers: {
            'ngrok-skip-browser-warning': 'ngrok-skip-browser-warning',
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          const { job_role, institute, yrs_of_exp } = response.data;
          setFormData({ job_role, institute, yrs_of_exp });
        }
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/login');
        } else if (error.response.status === 422) {
          alert(error.response.message);
        } else {
          alert('Interview cannot be schedule right now. Please try again later.');
        }
      }
    };

    fetchData();
  }, [VITE_API_URL, token]);

  const startInterview = () => {
    navigate('/interview');
  };

  const editDetails = () => {
    setUpdateProfile(true);
  };

  return (
    <header className="flex justify-between items-center px-4 py-6 bg-white shadow-md gap-2">
      {isSmallScreen ? (
        <>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent side="bottom" className=" bg-gray-50">
              <SheetHeader>
                <SheetTitle>Review Your Details</SheetTitle>
                <SheetDescription>Review your details or update them before starting your interview.</SheetDescription>
              </SheetHeader>
              <div className="mt-4 overflow-y-auto h-[calc(100%-80px)]">
                <InterviewFormContent formData={formData} readOnly={true} />
                <div className="flex justify-between mt-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={startInterview}>
                    Start Interview
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={editDetails}>
                    Edit Details
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger></DialogTrigger>
          <DialogContent className="bg-white max-w-lg p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle>Review Your Details</DialogTitle>
              <DialogDescription>Review your details or update them before starting your interview.</DialogDescription>
            </DialogHeader>
            <InterviewFormContent formData={formData} readOnly={true} />
            <div className="flex justify-between mt-4">
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={editDetails}>
                Edit Details
              </button>
              <button className="bg-blue-700 text-white px-4 py-2 rounded" onClick={startInterview}>
                Start Interview
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </header>
  );
}
