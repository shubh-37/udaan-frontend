import axios from 'axios';
import { createContext } from 'react';

export const aptitudeContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AptitudeProvider({ children }) {
  const { VITE_API_URL } = import.meta.env;
  async function startQuickTest(config) {
    try {
      const response = await axios.get(`${VITE_API_URL}/aptitude/15`, {
        params: { topics: config.topics },
        paramsSerializer: (params) => {
          return new URLSearchParams(params).toString();
        },
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
      } else if (error.response?.status === 400) {
        return 'duplicate';
      }
    }
  }

  async function startFullTest(config) {
    try {
      const response = await axios.get(`${VITE_API_URL}/aptitude/30`, {
        params: { topics: config.topics }, // Send topics as query params
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

  return <aptitudeContext.Provider value={{ startQuickTest, startFullTest }}>{children}</aptitudeContext.Provider>;
}
