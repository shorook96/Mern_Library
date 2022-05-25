import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UseAuth } from './Auth';

const CheckAuth = ({ children }) => {
  const auth = UseAuth();
  const Location = useLocation();

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
