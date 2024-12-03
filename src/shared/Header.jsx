import { useState, useEffect } from 'react';
import axios from 'axios';
import https from 'https';
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
    industry: '',
    location: ''
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
    submissionData.append('location', formData.location);

    if (resume) {
      submissionData.append('resume', resume);
    }

    try {
      const agent = new https.Agent({
        rejectUnauthorized: false
      });
      const response = await axios.post(
        'https://ec2-3-110-37-239.ap-south-1.compute.amazonaws.com:8000/submit_user_data',
        submissionData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          httpsAgent: agent
        }
      );

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

  // const FormContent = () => (
  //   <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
  //     <div>
  //       <label className="block text-gray-600 font-medium mb-2">Upload Resume</label>
  //       <input
  //         type="file"
  //         accept=".pdf"
  //         onChange={handleResumeUpload}
  //         className="block w-full p-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
  //       />
  //       {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
  //       {resume && (
  //         <div className="mt-2 flex items-center gap-4">
  //           <p className="text-sm text-gray-500">{resume.name}</p>
  //           <button
  //             type="button"
  //             onClick={handleRemoveFile}
  //             className="text-red-500 text-sm font-medium underline hover:text-red-700"
  //           >
  //             Remove
  //           </button>
  //         </div>
  //       )}
  //     </div>

  //     <div>
  //       <label className="block text-gray-600 font-medium mb-2">Job Role</label>
  //       <input
  //         type="text"
  //         name="jobRole"
  //         value={formData.jobRole}
  //         onChange={handleInputChange}
  //         placeholder="Enter Job Role"
  //         className="block w-full p-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
  //       />
  //     </div>

  //     <div>
  //       <label className="block text-gray-600 font-medium mb-2">Industry</label>
  //       <input
  //         type="text"
  //         name="industry"
  //         value={formData.industry}
  //         onChange={handleInputChange}
  //         placeholder="Enter Industry"
  //         className="block w-full p-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
  //       />
  //     </div>

  //     <div>
  //       <label className="block text-gray-600 font-medium mb-2">Location</label>
  //       <input
  //         type="text"
  //         name="location"
  //         value={formData.location}
  //         onChange={handleInputChange}
  //         placeholder="Enter Location"
  //         className="block w-full p-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
  //       />
  //     </div>

  //     <button
  //       type="submit"
  //       className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
  //       disabled={!resume || error}
  //     >
  //       Start Interview
  //     </button>
  //   </form>
  // );

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
