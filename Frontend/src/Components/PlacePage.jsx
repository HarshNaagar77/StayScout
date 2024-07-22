import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import '../Css/PlacePage.css';
import '../Css/Navbar.css';
import logo from '../assets/logo4.png';
import { NavLink } from 'react-router-dom';

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null); // Initialize as null

  useEffect(() => {
    axios.get(`http://localhost:3000/place/${id}`)
      .then(res => {
        setPlace(res.data);
      })
      .catch(error => {
        console.error('Error fetching place data:', error);
      });
  }, [id]);

  if (!place) {
    return <p>Loading...</p>; // Handle loading state
  }

  return (
    <div>
      <div className='navbar'>
        <div className='logoname'>
          <img className='logo' src={logo} alt="Logo" />
          <p className='logotext'>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'logotexxt active' : 'logotexxt')}>StayScout</NavLink>
          </p>
        </div>
        <div>
          <ul className='innerfeed'>
            <li>
              <NavLink to='/feed'>Feed</NavLink>
            </li>
            <li>
              <NavLink to='/add'>Add</NavLink>
            </li>
          </ul>
        </div>
        <div className='rightnav'>
          <i className="bi bi-person"></i>
        </div>
      </div>
      <div className="inner">
        <div className="inner1">
          <div className="inner1first">
          <img
              className='innerimg'
              src={`http://localhost:3000/uploads/${place.images[0]}`} // Correct path to image
              alt="place"
            />
          </div>
          <div className="inner1second">
          {place.images && place.images
          .filter((_, index) => index !== 0) // Exclude image at index 0
          .map((image, index) => (
            <img
              key={index}
              className='innerimg2'
              src={`http://localhost:3000/uploads/${image}`} // Correct path to image
              alt="place"
            />
          ))}

          </div>
        </div>
        <div className="inner2">
          <h3>{place.title}</h3>
          <p>{place.description}</p>
          <p>{place.price}</p>
          <p>{place.location}</p>
          <p>{place.category}</p>
          <p>{place.services.join(', ')}</p> {/* Join services with a comma if it's an array */}
        </div>
      </div>
    </div>
  );
}
