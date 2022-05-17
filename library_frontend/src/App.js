import Footer from './components/Footer';
// import { Routers, Router } from 'react-router-dom';
import NavComponent from './components/NavComponent';
import HomeComponent from './components/Home';
import React from 'react';
import { UseAuth } from './components/Helpers/Auth';
import UserHome from './components/LoggedUserComponents/UserHome';
import UserProfile from './components/LoggedUserComponents/UserProfile';

function App() {
  const { user } = UseAuth();

  return (
    <React.Fragment>
      <NavComponent />
      {user ? <div>{<UserProfile />}</div> : <HomeComponent />}

      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default App;
