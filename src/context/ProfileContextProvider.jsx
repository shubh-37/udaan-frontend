import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const profileContext = createContext();

// eslint-disable-next-line react/prop-types
export default function ProfileProvider({ children }) {
  const { VITE_API_URL } = import.meta.env;
  const [profile, setProfile] = useState(null);
  const [aptitudeScores, setAptitudeScores] = useState(null);
  const [dashboardData, setDashboardData] = useState(null); 
  const [profileCompletion, setProfileCompletion] = useState(0);
  useEffect(() => {
    if (!profile) return;

    const requiredFields = [
      'name',
      'email',
      'mobile_number',
      'job_role',
      'organization',
      'years_of_experience',
      'field',
      'resume'
    ];

    let completedCount = 0;
    requiredFields.forEach((field) => {
      if (profile[field]) {
        completedCount++;
      }
    });

    const completion = (completedCount / requiredFields.length) * 100;
    setProfileCompletion(completion);
  }, [profile]);

  async function getProfile() {
    try {
      const response = await axios.get(`${VITE_API_URL}/user/profile`, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log({"Get Profile" : response});
      if (response.status === 200) {
        setProfile(response.data);
      }
    } catch (error) {
      if (error.response?.status === 500) {
        return 'failure';
      } else if (error.response?.status === 400) {
        return 'duplicate';
      }
    }
  }

  async function getDashboardData(config) {
    try {
      const response = await axios.get(`${VITE_API_URL}/user/dashboard`, {
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
      console.log({"Dashboard data" : response});

      if (response.status === 200) {
        setDashboardData(response.data); 
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

  async function getAptitudeScores(data) {
    try {
      const response = await axios.get(`${VITE_API_URL}/aptitude/scores`, {
        data,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log({"Aptitude Scores" : response});

      if (response.status === 200) {
        setAptitudeScores(response.data); 
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
  async function updateProfile(data) {
    try {
      const response = await axios.patch(`${VITE_API_URL}/user/profile`, data, {
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
  async function updateResume(data) {
    try {
      const response = await axios.post(`${VITE_API_URL}/user/profile/resume`, data, {
        timeout: 10000,
        headers: {
          'Content-Type': 'form-data',
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
  async function updateAboutUser(data) {
    try {
      const response = await axios.post(
        `${VITE_API_URL}/user/profile/about`,
        { about: data },
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
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

  async function getCompanies() {
    try {
      const response = await axios.get(`${VITE_API_URL}/user/companies`, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        if (response.data.message === 'No companies available currently') {
          return [];
        }
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <profileContext.Provider
      value={{
        getProfile,
        updateProfile,
        updateAboutUser,
        getAptitudeScores,
        getDashboardData,
        profile,
        aptitudeScores,
        dashboardData,
        setProfile,
        getCompanies,
        updateResume,
        profileCompletion
      }}
    >
      {children}
    </profileContext.Provider>
  );
}
