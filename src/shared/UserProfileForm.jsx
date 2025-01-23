import { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../components/ui/sheet';
import { FormContent } from './ProfileFormContent';

export default function UserProfileForm({ isOpen, setIsOpen }) {
  const { VITE_API_URL } = import.meta.env;
  const token = localStorage.getItem('token');
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
            'ngrok-skip-browser-warning': 'ngrok-skip-browser-warning',
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          const { resume, ...otherData } = response.data;
          setFormData({ ...otherData, resume: null });
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        alert('Unable to fetch user information. Please try again later.');
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
    const formDataToSubmit = new FormData(); // Create FormData object for file upload
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      const response = await axios.patch(
        `${VITE_API_URL}/profile`,
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.status === 200) {
        alert('Profile updated successfully!');
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Unable to update profile. Please try again later.');
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
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
