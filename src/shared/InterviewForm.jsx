import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import InterviewFormContent from './InterviewFormContent';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { profileContext } from '@/context/ProfileContextProvider';

export default function InterviewForm({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const { getProfile, profile } = useContext(profileContext);

  const [formData, setFormData] = useState({
    job_role: '',
    organization: '',
    years_of_experience: 0,
    resume_url: '',
    field: ''
  });

  const [isInterviewValid, setIsInterviewValid] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
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
    if (!profile) {
      const fetchData = async () => {
        try {
          await getProfile();
        } catch (error) {
          if (error.response?.status === 401) {
            navigate('/login');
          } else if (error.response?.status === 422) {
            alert(error.response.data.detail);
          } else {
            alert('Interview cannot be scheduled right now. Please try again later.');
          }
        }
      };
      fetchData();
    }
  }, [getProfile, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        job_role: profile.job_role || '',
        organization: profile.organization || '',
        years_of_experience: profile.years_of_experience || 0,
        resume_url: profile.resume_url || '',
        field: profile.field || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    const requiredFields = ['job_role', 'organization', 'years_of_experience', 'resume_url', 'field'];
    const missing = requiredFields.filter((field) => {
      if (field === 'years_of_experience') {
        return formData[field] <= 0;
      }
      return !formData[field];
    });

    setMissingFields(missing);
    setIsInterviewValid(missing.length === 0);
  }, [formData]);

  const startInterview = () => {
    navigate('/interview');
  };

  return (
    <header className="flex justify-between items-center px-4 py-6 bg-background shadow-md gap-2 dark:bg-gray-900">
      {isSmallScreen ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="bottom" className="bg-gray-50 dark:bg-gray-800 p-6 overflow-y-auto rounded-t-lg">
            <SheetHeader>
              <SheetTitle className="dark:text-gray-200">Review Your Details</SheetTitle>
              <SheetDescription className="dark:text-gray-400">
                <p>Review your details or update them before starting your interview.</p>
                <p className="mt-2 text-sm">
                  <b>(Overall experience, organization, field, job role, and resume are mandatory for interview to start**)</b>
                </p>
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 overflow-y-auto h-[calc(100%-80px)]">
              <InterviewFormContent formData={formData} readOnly={true} />

              {missingFields.length > 0 && (
                <div className="mt-4 text-red-600 dark:text-red-400 text-sm">
                  <p>The following fields are missing or invalid:</p>
                  <ul className="list-disc list-inside">
                    {missingFields.map((field) => (
                      <li key={field}>{field}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-between mt-4">
                <Link to="/profile">
                  <button className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-lg shadow hover:bg-gray-400 dark:hover:bg-gray-600 transition">
                    Edit Profile
                  </button>
                </Link>
                <button
                  onClick={startInterview}
                  disabled={!isInterviewValid}
                  className={`px-6 py-2 rounded-lg shadow transition ${
                    isInterviewValid
                      ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400'
                      : 'bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Start Interview
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="hidden">Open Form</button>
          </DialogTrigger>
          <DialogContent className="bg-gray-50 dark:bg-gray-800 p-6 max-h-[80vh] overflow-y-auto rounded-lg">
            <DialogHeader>
              <DialogTitle className="dark:text-gray-200">Review Your Details</DialogTitle>
            </DialogHeader>
              <InterviewFormContent formData={formData} readOnly={true} />

              {missingFields.length > 0 && (
                <div className="mt-4 text-red-600 dark:text-red-400 text-sm">
                  <p>The following fields are missing or invalid:</p>
                  <ul className="list-disc list-inside">
                    {missingFields.map((field) => (
                      <li key={field}>{field}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-between mt-4">
                <Link to="/profile">
                  <button className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-lg shadow hover:bg-gray-400 dark:hover:bg-gray-600 transition">
                    Edit Profile
                  </button>
                </Link>
                <button
                  onClick={startInterview}
                  disabled={!isInterviewValid}
                  className={`px-6 py-2 rounded-lg shadow transition ${
                    isInterviewValid
                      ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400'
                      : 'bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-400 cursor-not-allowed'
                  }`}
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
