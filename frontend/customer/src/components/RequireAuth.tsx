// src/components/RequireAuth.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../middleware/auth';

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/auth');
    }
  }, [navigate]);

  return isAuthenticated() ? children : null;
};

export default RequireAuth;