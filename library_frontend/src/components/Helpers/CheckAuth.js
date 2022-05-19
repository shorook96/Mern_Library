import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import LogIn from '../LogIn';
import { UseAuth } from './Auth';

const CheckAuth = ({ children }) => {
  const auth = UseAuth();
  const nav = useNavigate();
  const Location = useLocation();
  const [showLogIn, setLogInShow] = useState(true);
  const handleLogInClose = () => {
    console.log('closed fronm');
    setLogInShow(false);
    nav('/', { replace: true });
  };
  const handleLogInShow = () => setLogInShow(true);
  console.log(Location.pathname);

  if (!auth.user) {
    return (
      <Navigate
        to="/login"
        state={{
          path: Location.pathname,
        }}
      />
    );
  }

  return children;
};

export default CheckAuth;
