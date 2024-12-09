import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import logo from '../assets/logo.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import Loader from './Loader';
import BottomSheet from './Bottomsheet';
import FormContent from './FormContent';

export default function Header() {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controls Dialog visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Controls Drawer visibility
  const [formData, setFormData] = useState({
    jobRole: '',
    industry: ''
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

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      setResume(null);
      return;
    }

    setError('');
    setResume(file);
  };

  const handleRemoveFile = () => {
    setResume(null);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDialogOpen(false);
    setIsDrawerOpen(false);

    setIsLoading(true);

    const submissionData = new FormData();
    submissionData.append('job_role', formData.jobRole);
    submissionData.append('industry', formData.industry);

    if (resume) {
      submissionData.append('resume', resume);
    }

    try {
      const response = await axios.post('https://udaan-backend.ip-dynamic.org/submit_user_data', submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        localStorage.setItem('thread_id', response.data.thread_id);
        setIsLoading(false);
        navigate('/interview');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false);
      alert('Interview cannot be schedule right now. Please try again later.');
    }
  };

  return (
    <header className="flex justify-between items-center px-4 py-6 bg-white shadow-md gap-2">
      {isLoading && <Loader text={'Preparing Interview...'} />}
      {isSmallScreen ? (
        <img src={logo} alt="logo" />
      ) : (
        <h1 className="text-3xl font-bold text-gray-600">Project UDAAN</h1>
      )}

      {isSmallScreen ? (
        <>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-blue-600 text-white p-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Get Started
          </button>
          <BottomSheet isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Fill Your Details">
            <FormContent
              formData={formData}
              handleInputChange={handleInputChange}
              handleResumeUpload={handleResumeUpload}
              handleRemoveFile={handleRemoveFile}
              handleSubmit={handleSubmit}
              resume={resume}
              error={error}
            />
          </BottomSheet>
        </>
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white max-w-lg p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle>Fill Your Details</DialogTitle>
              <DialogDescription>
                Upload your resume and provide basic details to get started with your interview preparation.
              </DialogDescription>
            </DialogHeader>
            <FormContent
              formData={formData}
              handleInputChange={handleInputChange}
              handleResumeUpload={handleResumeUpload}
              handleRemoveFile={handleRemoveFile}
              handleSubmit={handleSubmit}
              resume={resume}
              error={error}
            />
          </DialogContent>
        </Dialog>
      )}
    </header>
  );
}
