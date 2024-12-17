import { useCallback, useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import FormContent from './FormContent';
import axios from 'axios';

export function FeedbackForm({ isOpen, onOpenChange }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.matchMedia('(max-width: 430px)').matches);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [formData, setFormData] = useState({
    overall_experince: 5,
    recommend_score: 5,
    pay_for_report: false,
    pay_price: 0,
    suggestions: ''
  });

  const handleInputChange = useCallback((e) => {
    const { name, value, type } = e.target;

    // Handle numeric inputs
    const parsedValue = type === 'number' ? Number(value) || '' : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue
    }));
  }, []);

  const handleSliderChange = useCallback((name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSwitchChange = useCallback((checked) => {
    setFormData((prev) => ({ ...prev, pay_for_report: checked }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://udaan-backend.ip-dynamic.org/user_feedback', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert('Error submitting form');
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <>
      {!isSmallScreen ? (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[425px] bg-gray-50">
            <DialogHeader>
              <DialogTitle>Feedback Form</DialogTitle>
              <DialogDescription>
                We value your feedback. Please fill out this form to help us improve.
              </DialogDescription>
            </DialogHeader>
            <FormContent
              formData={formData}
              handleSliderChange={handleSliderChange}
              handleSwitchChange={handleSwitchChange}
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
          <SheetContent side="bottom" className="h-[90vh] bg-gray-50">
            <SheetHeader>
              <SheetTitle>Feedback Form</SheetTitle>
              <SheetDescription>We value your feedback. Please fill out this form to help us improve.</SheetDescription>
            </SheetHeader>
            <div className="mt-4 overflow-y-auto h-[calc(100%-80px)]">
              <FormContent
                formData={formData}
                handleSliderChange={handleSliderChange}
                handleSwitchChange={handleSwitchChange}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
