import axios from 'axios';
import { createContext } from 'react';

export const interviewContext = createContext();

// eslint-disable-next-line react/prop-types
export default function InterviewProvider({ children }) {
  const { VITE_API_URL, VITE_RAZORPAY_KEY_ID } = import.meta.env;
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

  return <interviewContext.Provider value={{ handlePayment, checkReview }}>{children}</interviewContext.Provider>;
}
