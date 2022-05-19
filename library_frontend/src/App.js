import Footer from './components/Footer';
// import { Routers, Router } from 'react-router-dom';
import NavComponent from './components/NavComponent';
import HomeComponent from './components/Home';
import React, { useState } from 'react';
import { UseAuth } from './components/Helpers/Auth';
import UserHome from './components/LoggedUserComponents/UserHome';
import UserProfile from './components/LoggedUserComponents/UserProfile';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import PageNotFoundComponent from './components/PageNotFoundComponent';
import BooksSlider from './components/LoggedUserComponents/BooksSlider';
import CheckAuth from './components/Helpers/CheckAuth';
import LogIn from './components/LogIn';

function App() {
  const { user } = UseAuth();
  const [showLogIn, setLogInShow] = useState(true);
  const Location = useLocation();
  const navigator = useNavigate();

  const handleLogInClose = () => {
    setLogInShow(false);
  };
  const changeUrl = (redirectPath) => {
    setLogInShow(true);
    if (!user) {
      if (redirectPath) {
        navigator(redirectPath, { replace: true });
      }
      navigator('/');
    }
  };
  return (
    <React.Fragment>
      <NavComponent />
      {user ? <UserHome /> : <HomeComponent />}
      <Routes>
        {/* <Route path="*" element={<PageNotFoundComponent />} /> */}

        <Route
          path="/login"
          element={
            <LogIn
              clicked={showLogIn}
              handleLogInClose={handleLogInClose}
              changeUrl={changeUrl}
              state={{ path: Location.pathname }}
            />
          }
        />
        <Route
          path="/books/:pagenumber"
          element={
            <CheckAuth>
              <BooksSlider />
            </CheckAuth>
          }
        />
        <Route
          path="/myprofile"
          element={
            <CheckAuth>
              <UserProfile />
            </CheckAuth>
          }
        />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
