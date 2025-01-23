import { useCallback, useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import FormContent from './FormContent';
import axios from 'axios';

export function FeedbackForm({ isOpen, onOpenChange }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if the form is being submitted
  const token = localStorage.getItem('token');
  const interview_id = localStorage.getItem('interview_id');
  const { VITE_API_URL } = import.meta.env;
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.matchMedia('(max-width: 430px)').matches);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [formData, setFormData] = useState({
    overall_experience: 5,
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
    setIsSubmitting(true); // Disable closing during submission
    try {
      const response = await axios.post(`${VITE_API_URL}/user_feedback`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          interview_id
        }
      });
      if (response.status === 200) {
        alert(response.data.message);
        onOpenChange(false); // Allow closing after submission
      }
    } catch (error) {
      alert('Error submitting form');
    } finally {
      setIsSubmitting(false); // Re-enable closing
    }
  };

  return (
    <>
      {!isSmallScreen ? (
        <Dialog open={isOpen} onOpenChange={(open) => isSubmitting || open}>
          <DialogContent className="sm:max-w-[425px] bg-gray-50" onClick={(e) => e.stopPropagation()}>
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
        <Sheet open={isOpen} onOpenChange={(open) => isSubmitting || open}>
          <SheetContent side="bottom" className="h-[90vh] bg-gray-50" onClick={(e) => e.stopPropagation()}>
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
