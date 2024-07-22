import React from 'react';
import '../Css/Navbar.css';
import logo from '../assets/logo4.png';
import { NavLink } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <div className='navbar'>
      <div className='logoname'>
        <img className='logo' src={logo} alt="Logo" />
        <p className='logotext'>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'logotexxt active' : 'logotexxt')}>StayScout</NavLink>
        </p>
      </div>
      <div>
        <ul>
          <li>
            <NavLink
              to='/feed'
              className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')}
            >
              {props.text}
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/add'
              className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')}
            >
              {props.text2}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='rightnav'>
        {!props.hideStartButton && (
          <button className='getstarted'>
            <NavLink
              to='/start'
              className={({ isActive }) => (isActive ? 'registerlink active' : 'registerlink')}
            >
              {props.start}
            </NavLink>
          </button>
        )}
        {!props.hideSearch && (
        <div className='search-bar'>
          <input 
            type="text" 
            placeholder="Search by title, price, location..." 
            value={props.searchQuery}
            onChange={props.onSearchChange}
          />
        </div>)
}
        <i className="bi bi-person"></i>
      </div>
    </div>
  );
}
