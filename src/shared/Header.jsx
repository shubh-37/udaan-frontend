import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Link } from 'react-router-dom';

export default function Header() {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
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

    const submissionData = new FormData();
    submissionData.append('jobRole', formData.jobRole);
    submissionData.append('industry', formData.industry);
    submissionData.append('location', formData.location);

    if (resume) {
      submissionData.append('resume', resume);
    }

    try {
      console.log('Form submitted successfully');
      // API call logic here
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const FormContent = () => (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-600 font-medium mb-2">Upload Resume</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleResumeUpload}
          className="block w-full p-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        {resume && (
          <div className="mt-2 flex items-center gap-4">
            <p className="text-sm text-gray-500">{resume.name}</p>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-500 text-sm font-medium underline hover:text-red-700"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-2">Job Role</label>
        <input
          type="text"
          name="jobRole"
          value={formData.jobRole}
          onChange={handleInputChange}
          placeholder="Enter Job Role"
          className="block w-full p-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-2">Industry</label>
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleInputChange}
          placeholder="Enter Industry"
          className="block w-full p-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-2">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Enter Location"
          className="block w-full p-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        disabled={!resume || error}
      >
        <Link to="/interview">Start Interview</Link>
      </button>
    </form>
  );

  return (
    <header className="flex justify-between items-center px-8 py-6 bg-white shadow-md">
      <h1 className="text-4xl font-bold">Project UDAAN</h1>

      {isSmallScreen ? (
        <Drawer>
          <DrawerTrigger>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
              Get Started
            </button>
          </DrawerTrigger>
          <DrawerContent className="bg-white p-6 rounded-lg">
            <DrawerHeader>
              <DrawerTitle>Fill Your Details</DrawerTitle>
            </DrawerHeader>
            {FormContent()}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog>
          <DialogTrigger>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
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
            {FormContent()}
          </DialogContent>
        </Dialog>
      )}
    </header>
  );
}
