import Footer from './components/Footer';
// import { Routers, Router } from 'react-router-dom';
import NavComponent from './components/NavComponent';
import HomeComponent from './components/Home';
import React from 'react';


function App() {
  return (

    <React.Fragment>
        <NavComponent />
        <HomeComponent/>
        {/* <Footer /> */}
       
       
    </React.Fragment>
    

    

  );
}

export default App;
