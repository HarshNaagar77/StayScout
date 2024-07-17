// App.jsx
import React, { useEffect } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Homepage2 from './Components/Homepage2';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {

  return (
    <div>
      <Navbar start = {'Get Started'}/>
      <Home />
      <Homepage2 />
    </div>
  );
}

export default App;
