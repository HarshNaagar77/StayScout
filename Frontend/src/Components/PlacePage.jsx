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
  const [place, setPlace] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    axios.get(`http://localhost:3000/place/${id}`)
      .then(res => {
        setPlace(res.data);
      })
      .catch(error => {
        console.error('Error fetching place data:', error);
      });


  }, [id]);
  useEffect(() => {
    if (place?.user) {
      axios.get(`http://localhost:3000/user/${place.user}`)
        .then(res => {
          setUser(res.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [place?.user]); 

  if (!place) {
    return <p>Loading...</p>;
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
            {place.images && place.images[0] && (
              <img
                className='innerimg'
                src={`http://localhost:3000/uploads/${place.images[0]}`}
                alt="place"
              />
            )}
          </div>
          <div className="inner1second">
            {place.images && place.images
              .filter((_, index) => index !== 0)
              .slice(0, 2)
              .map((image, index) => (
                <img
                  key={index}
                  className='innerimg2'
                  src={`http://localhost:3000/uploads/${image}`}
                  alt="place"
                />
              ))}
          </div>
        </div>
        <div className="inner2">
          <h3 className='placetitle'>{place.title}</h3>
          <p className='placedesc'>{place.description}</p>
          {/* <p className='placeprice'>₹{place.price} / {place.category}</p> */}
          <p className='placelocation'>{place.location}</p>
          <p className='host'>Hosted by {user && <p>{user.username}</p>}</p>
          <div className="placeservices">
            <h4>What this place offers </h4>
            <div>
              {place.services.map((service, index) => (
                <ul className='placeser' key={index}>
                  <li>{service}</li>
                  
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
