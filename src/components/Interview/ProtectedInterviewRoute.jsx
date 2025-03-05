// components/ProtectedRoute.jsx
import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { profileContext } from '../../context/ProfileContextProvider';

const ProtectedRoute = ({ children }) => {
  const { profile, profileCompletion, getProfile } = useContext(profileContext);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkProfile = async () => {
      if (!profile) {
        await getProfile();
      }
      setIsLoading(false);
    };
    checkProfile();
  }, [profile, getProfile]);

if (isLoading) {
    return <div>Loading...</div>;
  }

  if (profileCompletion < 100) {
    return <Navigate to="/profile" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;