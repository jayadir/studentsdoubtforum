import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/Slices/userSice';
import { useNavigate } from 'react-router-dom';

const ProtectRoute = ({ children }) => {
  const user = useSelector(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined || user === null) {
      navigate('/login');
      console.log('User not found', user);
    }
  }, [user, navigate]);
  if (user === undefined || user === null) {
    return null;
  }
  return children;
};

export default React.memo(ProtectRoute);
