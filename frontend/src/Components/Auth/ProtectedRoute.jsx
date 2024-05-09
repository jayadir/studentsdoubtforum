import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/Slices/userSice';
import { useNavigate } from 'react-router-dom';

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

const ProtectRoute = ({ children }) => {
  const user = useSelector(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = getCookie('jwt');

    if (!user && !jwtToken) {
      navigate('/login');
    } else if (jwtToken && !user) {
      console.log('JWT token exists but user data not available');
    }
  }, [user, navigate]);

  return user ? children : null;
};

export default React.memo(ProtectRoute);
