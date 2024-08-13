import React, { useState } from 'react';
import Navbar from './Navbar';
import '../Css/Profile.css';
import ProfilePage from '../Components/ProfilePage'
import MyPlace from '../Components/MyPlaces'
import MyBooking from '../Components/MyBooking'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [activeComponent, setActiveComponent] = useState('profile'); // State to manage the active component
  const navigate = useNavigate()

  const handleNavClick = (component) => {
    setActiveComponent(component);
  };

  const logout = () => {
    localStorage.removeItem('token');
    axios.post('http://localhost:3000/logout')
    navigate('/')
  }

  return (
    <div>
      <Navbar hideStartButton={true} hideSearch={true} />
      <div className="profile">
        <div className="nav2">
          <p onClick={() => handleNavClick('profile')}>
          <i class="bi bi-person-check"></i>
            <span className="tooltip">Profile</span>
          </p>
          <p onClick={() => handleNavClick('places')}>
            <i className='bi bi-geo-alt'></i>
            <span className="tooltip">Places</span>
          </p>
          <p onClick={() => handleNavClick('bookings')}>
            <i className='bi bi-calendar2'></i>
            <span className="tooltip">Bookings</span>
          </p>
          <p  onClick={logout}>
            <i className='bi bi-box-arrow-right'></i>
            <span className="tooltip">Logout</span>
          </p>
        </div>

        <div className="innercontent">
          {activeComponent === 'profile' && <div><ProfilePage></ProfilePage></div>}
          {activeComponent === 'places' && <div><MyPlace></MyPlace></div>}
          {activeComponent === 'bookings' && <div><MyBooking></MyBooking></div>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
