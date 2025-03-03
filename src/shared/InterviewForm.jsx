import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
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
        return formData[field] <= 0; // if 0 is invalid
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
    <header className="flex justify-between items-center px-4 py-6 bg-background shadow-md gap-2">
      {isSmallScreen ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="bottom" className=" bg-gray-50">
            <SheetHeader>
              <SheetTitle>Review Your Details</SheetTitle>
              <SheetDescription>
                Review your details or update them before starting your interview.
                <h5>
                  <b>
                    (Overall experience, organization, field, job role and resume is mandatory for interview to start**)
                  </b>
                </h5>
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 overflow-y-auto h-[calc(100%-80px)]">
              <InterviewFormContent formData={formData} readOnly={true} />

              {missingFields.length > 0 && (
                <div className="mt-4 text-red-600 text-sm">
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
                  <button className="bg-blue-700 text-white px-4 py-2 rounded">Edit Details</button>
                </Link>
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
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger></DialogTrigger>
          <DialogContent className="bg-background max-w-lg p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle>Review Your Details</DialogTitle>
              <DialogDescription>
                Review your details or update them before starting your interview.
                <h5>
                  <b>(Overall experience, company, job role and resume is mandatory for interview to start**)</b>
                </h5>
              </DialogDescription>
            </DialogHeader>

            <InterviewFormContent formData={formData} readOnly={true} />

            {missingFields.length > 0 && (
              <div className="mt-4 text-red-600 text-sm">
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
                <button className="bg-blue-700 text-white px-4 py-2 rounded">Edit Details</button>
              </Link>
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
