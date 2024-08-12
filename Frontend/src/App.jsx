// App.jsx
import React, { useEffect } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Homepage2 from './Components/Homepage2';
import axios from 'axios';

axios.defaults.baseURL = 'https://stayscout.onrender.com/';

function App() {

  return (
    <div>
      <Navbar start = {'Get Started'} hideSearch={true}  hideProfile = {true}/>
      <Home first = {"Scout"} second = {'For'} third = {'Comfort'}/>
      <Homepage2 />
    </div>
  );
}

export default App;
