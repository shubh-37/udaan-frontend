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
  const [isInterviewValid, setIsInterviewValid] = useState(false);
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
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          const { job_role, institute, yrs_of_exp, resume, company } = response.data;
          setIsInterviewValid(job_role && institute && typeof yrs_of_exp === 'number' && resume && company);
          setFormData({ job_role, institute, yrs_of_exp, company });
        }
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/login');
        } else if (error.response.status === 422) {
          alert(error.response.data.detail);
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
    <header className="flex justify-between items-center px-4 py-6 bg-background shadow-md gap-2">
      {isSmallScreen ? (
        <>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent side="bottom" className=" bg-gray-50">
              <SheetHeader>
                <SheetTitle>Review Your Details</SheetTitle>
                <SheetDescription>
                  Review your details or update them before starting your interview.{' '}
                  <h5>
                    <b>(Overall experience, institute, job role and resume is mandatory for interview to start**)</b>
                  </h5>
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 overflow-y-auto h-[calc(100%-80px)]">
                <InterviewFormContent formData={formData} readOnly={true} />
                <div className="flex justify-between mt-4">
                  <button className="bg-blue-700 text-white px-4 py-2 rounded" onClick={editDetails}>
                    Edit Details
                  </button>
                  <button
                    className={
                      isInterviewValid
                        ? 'bg-blue-700 text-white px-4 py-2 rounded'
                        : 'bg-blue-200 text-white px-4 py-2 rounded'
                    }
                    onClick={startInterview}
                    disabled={!isInterviewValid}
                  >
                    Start Interview
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger></DialogTrigger>
          <DialogContent className="bg-background max-w-lg p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle>Review Your Details</DialogTitle>
              <DialogDescription>
                Review your details or update them before starting your interview.{' '}
                <h5>
                  <b>(Overall experience, company, job role and resume is mandatory for interview to start**)</b>
                </h5>
              </DialogDescription>
            </DialogHeader>
            <InterviewFormContent formData={formData} readOnly={true} />
            <div className="flex justify-between mt-4">
              <button className="bg-blue-700 text-white px-4 py-2 rounded" onClick={editDetails}>
                Edit Details
              </button>
              <button
                className={
                  isInterviewValid
                    ? 'bg-blue-700 text-white px-4 py-2 rounded'
                    : 'bg-blue-200 text-white px-4 py-2 rounded'
                }
                onClick={startInterview}
                disabled={!isInterviewValid}
              >
                Start Interview
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </header>
  );
}
