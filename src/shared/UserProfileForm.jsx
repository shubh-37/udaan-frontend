import { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../components/ui/sheet';
import { FormContent } from './ProfileFormContent';
import { useNavigate } from 'react-router-dom';

export default function UserProfileForm({ isOpen, setIsOpen }) {
  const { VITE_API_URL } = import.meta.env;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isResume, setIsResume] = useState(true);
  const [formData, setFormData] = useState({
    institute: '',
    mobile_number: '',
    resume: '',
    yrs_of_exp: 0,
    job_role: '',
    company: '',
    full_name: '',
    password: '',
    email: ''
  });
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Handle screen size detection
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.matchMedia('(max-width: 430px)').matches);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${VITE_API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          const { resume, ...otherData } = response.data;
          setIsResume(resume);
          setFormData({ ...otherData, resume: null });
        }
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/login');
        } else if (error.response.status === 422) {
          alert(error.response.data.detail);
        } else {
          alert('Unable to fetch user information. Please try again later.');
        }
      }
    };
    fetchUserInfo();
  }, [token]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataToSubmit.append(key, formData[key]);
      }
    });
    try {
      const response = await axios.patch(`${VITE_API_URL}/profile`, formDataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setIsOpen(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/login');
      } else if (error.response.status === 422) {
        alert(error.response.data.detail);
      } else {
        alert('Unable to update profile. Please try again later.');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 200 * 1024) {
      // File size exceeds 200KB
      alert('File size must be less than 200KB');
      setFormData({ ...formData, resume: null });
    } else {
      setFormData({ ...formData, resume: file });
    }
  };

  // Form content

  return (
    <div>
      {isSmallScreen ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="bottom" className="bg-gray-50 max-h-[90vh] rounded-t-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Update Profile</SheetTitle>
              <SheetDescription>Modify your profile details below.</SheetDescription>
            </SheetHeader>
            <div className="mt-4 overflow-y-auto h-[calc(100%-80px)]">
              <FormContent
                formData={formData}
                handleFileChange={handleFileChange}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                isResume={isResume}
              />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="bg-white max-w-lg p-6 rounded-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Update Profile</DialogTitle>
              <DialogDescription>Modify your profile details below.</DialogDescription>
            </DialogHeader>
            <FormContent
              formData={formData}
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              isResume={isResume}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
