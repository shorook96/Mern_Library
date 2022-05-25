import Footer from './components/Footer';
import React, { useState } from 'react';
import { UseAuth } from './components/Helpers/Auth';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import CheckAuth from './components/Helpers/CheckAuth';

import AboutUs from './components/AboutUs';
import NavComponent from './components/NavBarComponents/NavComponent';
import LogIn from './components/NavBarComponents/LogIn';
import HomeComponent from './components/HomeComponents/Home';
import SideBar from './components/LoggedUserComponents/SideBar';
import UserHome from './components/LoggedUserComponents/UserHome';
import UserProfile from './components/LoggedUserComponents/UserProfile';
import BooksSlider from './components/LoggedUserComponents/Books/BooksSlider';
import Author from './components/LoggedUserComponents/AuthorDetails/Author';
import Book from './components/LoggedUserComponents/BookDetails/Book';
import AllAuthors from './components/LoggedUserComponents/Authors/AllAuthors';
import AllCategories from './components/LoggedUserComponents/CategoriesComponents/AllCategories';
import CategoryBooksSlider from './components/LoggedUserComponents/CategoriesComponents/CategoryBooksSlider';
import MyBookSlider from './components/LoggedUserComponents/MYBooksComponent/MyBookSlider';
import MyReadBooks from './components/LoggedUserComponents/MYBooksComponent/MyReadBooks';
import MyCurrentlyReadingBooks from './components/LoggedUserComponents/MYBooksComponent/MyCurrentlyReadingBooks';
import MyWantToReadBooks from './components/LoggedUserComponents/MYBooksComponent/MyWantToReadBooks';
import AuthorsBooksComponent from './components/LoggedUserComponents/Authors/AuthorBooksComponent';
import PageNotFoundComponent from './components/PageNotFoundComponent';

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
          <Route path="*" element={<PageNotFoundComponent />} />
          <Route path="Aboutus" element={<AboutUs />} />

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
            path="/user/myprofile"
            element={
              <CheckAuth>
                <UserProfile />
              </CheckAuth>
            }
          />
          <Route
            path="/user/myBooks/All"
            element={
              <CheckAuth>
                <MyBookSlider />
              </CheckAuth>
            }
          />
          <Route
            path="/user/categories/:categoryName/:id/books"
            element={
              <CheckAuth>
                <CategoryBooksSlider />
              </CheckAuth>
            }
          />
          <Route
            path="/user/authors/:authorName/:id/books"
            element={
              <CheckAuth>
                <AuthorsBooksComponent />
              </CheckAuth>
            }
          />
          <Route
            path="/user/myBooks/Read"
            element={
              <CheckAuth>
                <MyReadBooks />
              </CheckAuth>
            }
          />
          <Route
            path="/Author/:id"
            element={
              <CheckAuth>
                <Author />
              </CheckAuth>
            }
          />
          <Route
            path="/user/myBooks/CurrentlyReading"
            element={
              <CheckAuth>
                <MyCurrentlyReadingBooks />
              </CheckAuth>
            }
          />
          <Route
            path="/user/myBooks/WantToRead"
            element={
              <CheckAuth>
                <MyWantToReadBooks />
              </CheckAuth>
            }
          />

          <Route
            path="/Book/:id"
            element={
              <CheckAuth>
                <Book />
              </CheckAuth>
            }
          />

          <Route
            path="/"
            element={user ? <MyBookSlider /> : <HomeComponent />}
          />
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
