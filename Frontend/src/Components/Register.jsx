import React, { useState } from 'react';
import Navbar from './Navbar';
import '../Css/RegisterForm.css';
import '../Css/Register_mobile.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true

function Register() {
  return (
    <div>
      <Navbar  hideStartButton={true} />
      <RegisterForm />
    </div>
  );
}

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const logout = () => {
    axios.post('http://localhost:3000/logout')
    localStorage.removeItem('token')
  }

  const navigate = useNavigate();
  // Other state and function definitions remain the same

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/registeruser', {
        username,
        email,
        password,
      });
      console.log(response.data.message);
      // Clear the input fields
      setUsername('');
      setEmail('');
      setPassword('');
      // Redirect to /feed
      setIsRegistered(true)
      localStorage.setItem('token', response.data.token);
      navigate('/feed');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  return (
    <div className='registerform'>
      <div>
      <h2 className='register'>Register</h2>
      <Link to='/login'>
      <button type='submit' className='demo'>Not have an account ? <span className=' loginbtn'>Login</span></button>
      </Link>
      </div>
      <form className='form1' onSubmit={submitHandler}>
        <div>
          <label>Username</label>
          <input className='username' placeholder='Enter your username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input className='email' placeholder='Enter your email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input className='password' placeholder='Enter your password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <button type='submit' className='submit'>Submit</button>
        </div>
        {/* <Link to = "/login">Login</Link> */}
      </form>


      {/* <button onClick={logout} className='logout'>Logout</button> */}
    </div>
  );
}

export default Register;
