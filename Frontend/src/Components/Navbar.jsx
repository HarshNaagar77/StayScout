import React from 'react'
import '../Css/Navbar.css';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';


export default function Navbar(props) {
  return (
    <div className='navbar'>
      <div className='logoname'>
      <img className='logo' src={logo} alt="" />
      <p className='logotext'><Link to = "/" className='logotexxt'>StayScout</Link></p>
      </div>
      <div>
        <ul>
          <li><Link to='/' className='navlink navlink1 registerlink'>{props.text}</Link></li>
          <li><Link to='/add' className='navlink registerlink'>{props.text2}</Link></li>
        </ul>
        </div>
      <div className='rightnav'>
      {!props.hideStartButton && (
          <button className='getstarted'>
            <Link to='/start' className='registerlink'>{props.start}</Link>
          </button>
        )}
        <i class="bi bi-person"></i>
      </div>
    </div>
  )
}
