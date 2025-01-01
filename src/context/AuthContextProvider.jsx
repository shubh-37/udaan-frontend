import axios from 'axios';
import { createContext } from 'react';

export const authContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  async function signUpUser(user) {
    try {
      const response = await axios.post('https://udaan-backend.ip-dynamic.org/signup', user, {
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
      const response = await axios.post('https://udaan-backend.ip-dynamic.org/login', user);
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

  return <authContext.Provider value={{ signUpUser, loginUser }}>{children}</authContext.Provider>;
}
