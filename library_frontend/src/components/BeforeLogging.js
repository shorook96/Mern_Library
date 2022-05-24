import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogIn from './LogIn';
import SignUpComponent from './SignUpComponent';

const BeforeLogging = () => {
  const [showSignUp, setSignUpShow] = useState(false);
  const handleSignUpClose = () => setSignUpShow(false);
  const handleSignUpShow = () => setSignUpShow(true);
  const [showLogIn, setLogInShow] = useState(false);
  const handleLogInClose = () => {
    console.log('closed fronm  before logged in');

    setLogInShow(false);
  };

  return (
    <>
      <div className="w-50 m-auto  ">
        <button
          onClick={handleSignUpShow}
          className="text-white btn btn-outline-warning btn-success btn-rounded  m-2  btn_logging"
        >
          SignUp
        </button>
        <Link
          to="/login"
          className="text-white  btn btn-outline-warning btn-success btn-rounded  m-2 btn_logging "
        >
          LogIn
        </Link>
      </div>
      <SignUpComponent
        clicked={showSignUp}
        handleSignUpClose={handleSignUpClose}
      />
      <LogIn clicked={showLogIn} handleLogInClose={handleLogInClose} />
    </>
  );
};

export default BeforeLogging;
