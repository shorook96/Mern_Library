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
import AllAuthors from './components/LoggedUserComponents/AllAuthors';
import AllCategories from './components/LoggedUserComponents/AllCategories';
import SideBar from './components/SideBar';
// import Author from './components/Author';
// import Book from './components/Book';

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
      <div className={user ? 'd-flex' : ''}>
        {user ? <SideBar /> : null}
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <UserHome />
              ) : (
                <>
                  <HomeComponent />
                  <LogIn
                    clicked={showLogIn}
                    handleLogInClose={handleLogInClose}
                    changeUrl={changeUrl}
                    state={{ path: Location.pathname }}
                  />
                </>
              )
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
            path="/authors/:pagenumber"
            element={
              <CheckAuth>
                <AllAuthors />
              </CheckAuth>
            }
          />

          <Route
            path="/categories/:pagenumber"
            element={
              <CheckAuth>
                <AllCategories />
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

          <Route path="/" element={user ? <UserHome /> : <HomeComponent />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default App;
