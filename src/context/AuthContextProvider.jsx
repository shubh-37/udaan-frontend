import axios from 'axios';
import { createContext, useState } from 'react';

export const authContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  const { VITE_API_URL } = import.meta.env;
  const [updateProfile, setUpdateProfile] = useState(false);
  async function signUpUser(user) {
    try {
      const response = await axios.post(`${VITE_API_URL}/user/signup`, user, {
        timeout: 10000
      });
      if (response.status === 200) {
        return 'success';
      }
    } catch (error) {
      if (error.response.status === 500) {
        return 'failure';
      } else if (error.response.status === 400) {
        return 'duplicate';
      }
    }
  }

  async function verifySignUpOtp(user) {
    try {
      const response = await axios.post(`${VITE_API_URL}/user/verifySignOtp`, user, {
        timeout: 10000
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        return 'success';
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
      const response = await axios.post(`${VITE_API_URL}/user/sendOtp`, user, {
        timeout: 10000
      });
      if (response.status === 200) {
        return 'success';
      }
    } catch (error) {
      if (error.response.status === 500) {
        return 'failure';
      } else if (error.response.status === 401) {
        return 'invalid';
      }
    }
  }
  async function verifyLoginOtp(user) {
    try {
      const response = await axios.post(`${VITE_API_URL}/user/verifyOtp`, user, {
        timeout: 10000
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        return 'success';
      }
    } catch (error) {
      if (error.response.status === 500) {
        return 'failure';
      } else if (error.response.status === 400) {
        return 'duplicate';
      }
    }
  }
  async function resendOtp(user) {
    try {
      const response = await axios.post(`${VITE_API_URL}/user/resendOtp`, user, {
        timeout: 10000
      });
      if (response.status === 200) {
        return 'success';
      }
    } catch (error) {
      if (error.response.status === 500) {
        return 'failure';
      } else if (error.response.status === 400) {
        return 'duplicate';
      }
    }
  }

  return (
    <authContext.Provider
      value={{ signUpUser, loginUser, updateProfile, setUpdateProfile, verifySignUpOtp, verifyLoginOtp, resendOtp }}
    >
      {children}
    </authContext.Provider>
  );
}
