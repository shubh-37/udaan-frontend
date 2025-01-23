import axios from 'axios';
import { createContext, useState } from 'react';

export const authContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  const { VITE_API_URL } = import.meta.env;
  const [updateProfile, setUpdateProfile] = useState(false);
  async function signUpUser(user) {
    try {
      const response = await axios.post(`${VITE_API_URL}/signup`, user, {
        timeout: 10000,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
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
       `${VITE_API_URL}/login`,
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
