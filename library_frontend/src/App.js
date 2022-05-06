import './App.css';
import Footer from './components/Footer';
// import { Routers, Router } from 'react-router-dom';
import NavComponent from './components/NavComponent';

import HomeComponent from './components/Home';
function App() {
  return (
    <div className="App">
      <NavComponent />
      <HomeComponent/>
      <Footer />
    </div>
  );
}

export default App;
