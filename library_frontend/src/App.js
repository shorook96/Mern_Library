import Footer from './components/Footer';
// import { Routers, Router } from 'react-router-dom';
import NavComponent from './components/NavComponent';
import HomeComponent from './components/Home';
import React from 'react';
import { UseAuth } from './components/Helpers/Auth';
import UserHome from './components/LoggedUserComponents/UserHome';
import UserProfile from './components/LoggedUserComponents/UserProfile';
import { Route, Routes } from 'react-router-dom';
import PageNotFoundComponent from './components/PageNotFoundComponent';
// import Author from './components/Author';
// import Book from './components/Book';

function App() {
  const { user } = UseAuth();

  return (
    <React.Fragment>
      <NavComponent />
      {/* {user ? <div>{<UserHome />}</div> : <HomeComponent />} */}
      <Routes>
        <Route path="*" element={<PageNotFoundComponent />} />
        <Route path="/" element={user ? <UserHome /> : <HomeComponent />} />
        {/* <Route path="/author" element={<Author/>}></Route>
        <Route path="/book" element={<Book/>}></Route> */}
        
      </Routes>
      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default App;
