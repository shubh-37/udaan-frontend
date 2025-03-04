import axios from 'axios';
import { createContext, useState } from 'react';

export const interviewContext = createContext();

// eslint-disable-next-line react/prop-types
export default function InterviewProvider({ children }) {
  const { VITE_API_URL, VITE_RAZORPAY_KEY_ID } = import.meta.env;
  const [questions, setQuestions] = useState([]);
  const [imageLink, setImageLink] = useState('');
  async function handlePayment() {
    let verificationResponse;
    try {
      const response = await axios.post(`${VITE_API_URL}/interview/create_order`, null, {
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
          const verifyRes = await axios.post(
            `${VITE_API_URL}/interview/verify_order`,
            {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              reviews_bought: 1
            },
            {
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` }
            }
          );
          if (verifyRes.status) {
            verificationResponse = verifyRes.data;
            alert('Payment Successful!');
          } else {
            alert('Payment Verification Failed!');
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

  async function checkReview() {
    try {
      const response = await axios.get(`${VITE_API_URL}/interview/check_review`, {
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
        transcribeResponse
      }}
    >
      {children}
    </interviewContext.Provider>
  );
}
