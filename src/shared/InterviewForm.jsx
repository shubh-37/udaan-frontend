import { useState, useEffect } from 'react';
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
export default function InterviewForm({ isOpen, setIsOpen, setIsLoading }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    job_role: '',
    industry: '',
    overall_experience_yrs: 0
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsOpen(false);
    try {
      const response = await axios.post('https://udaan-backend.ip-dynamic.org/interview_input', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        localStorage.setItem('interview_id', response.data.interview_id);
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
      {isSmallScreen ? (
        <>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent side="bottom" className=" bg-gray-50">
              <SheetHeader>
                <SheetTitle>Fill Your Details</SheetTitle>
                <SheetDescription>
                  Provide basic details to get started with your interview preparation.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 overflow-y-auto h-[calc(100%-80px)]">
                <InterviewFormContent
                  formData={formData}
                  handleSubmit={handleSubmit}
                  handleInputChange={handleInputChange}
                />
              </div>
            </SheetContent>
          </Sheet>
        </>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger></DialogTrigger>
          <DialogContent className="bg-white max-w-lg p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle>Fill Your Details</DialogTitle>
              <DialogDescription>
                Provide basic details to get started with your interview preparation.
              </DialogDescription>
            </DialogHeader>
            <InterviewFormContent
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </DialogContent>
        </Dialog>
      )}
    </header>
  );
}
