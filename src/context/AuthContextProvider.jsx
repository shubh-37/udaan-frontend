import axios from 'axios';
import { createContext, useState } from 'react';

export const authContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  const [updateProfile, setUpdateProfile] = useState(false);
  async function signUpUser(user) {
    try {
      const response = await axios.post(
        'https://a3f4-2401-4900-1c7e-256e-88f6-5352-a501-18df.ngrok-free.app/signup',
        user,
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.status === 200) {
        if (response.data.message) {
          localStorage.setItem('token', response.data.message);
          return 'success';
        }
      }
    } catch (error) {
      if (error.response.status === 500) {
        return 'failure';
      } else if (error.response.status === 400) {
        return 'duplicate';
      }
    }
  }

  async function loginUser(user) {
    try {
      const response = await axios.post(
        'https://a3f4-2401-4900-1c7e-256e-88f6-5352-a501-18df.ngrok-free.app/login',
        user,
        {
          timeout: 10000
        }
      );
      if (response.status === 200) {
        if (response.data.message) {
          localStorage.setItem('token', response.data.message);
          return 'success';
        }
      }
    } catch (error) {
      if (error.response.status === 500) {
        return 'failure';
      } else if (error.response.status === 401) {
        return 'invalid';
      }
    }
  }

  return (
    <authContext.Provider value={{ signUpUser, loginUser, updateProfile, setUpdateProfile }}>
      {children}
    </authContext.Provider>
  );
}
