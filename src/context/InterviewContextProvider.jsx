import axios from 'axios';
import { createContext, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
export const interviewContext = createContext();

// eslint-disable-next-line react/prop-types
export default function InterviewProvider({ children }) {
  const { VITE_API_URL, VITE_RAZORPAY_KEY_ID } = import.meta.env;
  const [questions, setQuestions] = useState([]);
  const [imageLink, setImageLink] = useState('');
  const navigate = useNavigate();

  async function handlePayment(interviewId) {
    let verificationResponse;
    try {
      const response = await axios.post(`${VITE_API_URL}/interview/create_order?interview_id=${interviewId}`, null, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (!response) {
        alert('Error creating order');
        return;
      }

      const options = {
        key: VITE_RAZORPAY_KEY_ID,
        amount: response.data.amount / 100,
        currency: 'INR',
        name: 'PrepSOM Labs',
        description: 'Upgrade to Premium',
        order_id: response.data.order_id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${VITE_API_URL}/interview/verify_order?interview_id=${interviewId}`,
              {
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                reviews_bought: 1
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              }
            );
            if (verifyRes.status === 200) {
              toast('Payment Successful!');

              if (interviewId) {
                navigate(`/review/${interviewId}`);
              } else {
                toast.error('Interview ID not found!');
              }
            } else {
              toast.error('Payment Verification Failed!');
            }
          } catch (error) {
            toast.error('Payment Verification Error');
          }
        },
        theme: {
          color: '#3399cc'
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();

      return verificationResponse;
    } catch (error) {
      if (error.response?.status === 500) {
        return 'failure';
      } else if (error.response?.status === 400) {
        return 'duplicate';
      }
    }
  }

  async function checkReview(interviewId) {
    try {
      const response = await axios.get(`${VITE_API_URL}/interview/check_review?interview_id=${interviewId}`, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response?.status === 500) {
        return 'failure';
      } else if (error.response?.status === 401) {
        return 'invalid';
      }
    }
  }

  async function startInterview() {
    try {
      const response = await axios.get(`${VITE_API_URL}/interview/start_interview`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        localStorage.setItem('interview_id', response.data.interview_id);
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function textToSpeech(text) {
    try {
      const response = await axios.post(
        `${VITE_API_URL}/interview/synthesize_speech`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          responseType: 'blob'
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function submitInterview(interviewId) {
    try {
      const response = await axios.post(
        `${VITE_API_URL}/interview/submit_interview?interview_id=${interviewId}`,
        null,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error submitting interview:', error);
      throw error;
    }
  }

  async function premiumReview(interviewId) {
    try {
      const response = await axios.get(`${VITE_API_URL}/interview/paid`, {
        params: { interview_id: interviewId },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 403) {
        setTimeout(() => {
          toast('Payment is not recieved');
          navigate('/review');
        }, 2000);
      }
      console.error('Error submitting interview:', error);
      throw error;
    }
  }

  async function transcribeResponse(formData, question_id) {
    const interviewId = localStorage.getItem('interview_id');
    const url = `${VITE_API_URL}/interview/transcribe?question_id=${question_id}&interview_id=${interviewId}`;
    try {
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <interviewContext.Provider
      value={{
        handlePayment,
        checkReview,
        startInterview,
        textToSpeech,
        submitInterview,
        questions,
        setQuestions,
        imageLink,
        setImageLink,
        transcribeResponse,
        premiumReview
      }}
    >
      {children}
    </interviewContext.Provider>
  );
}
