import React, { useState } from 'react';
import Navbar from './Navbar';
import '../Css/Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      <Navbar hideStartButton={true} />
      <LoginPage />
    </div>
  );
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
            // Send login request
      const response = await axios.post('http://localhost:3000/login', { email, password }, { withCredentials: true });

      // Store token and reset form fields
      localStorage.setItem('token', response.data.token);
      setEmail('');
      setPassword('');

      // Redirect to /feed
      navigate('/feed');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your email and password.');
    }
  }

  return (
    <div className='registerform'>
      <div>
        <h2 className="register">Login</h2>
        <Link to = "/register">
          <button type='submit' className='submit2 submit'>New user ? Register now</button>
        </Link>
      </div>
      <form className=' form' onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input className='email' placeholder='Enter your email'
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required='true'
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input className='password' placeholder='Enter your password'
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required='true'
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <button type='submit' className='submit loginsubmit'>Login</button>
      </form>
    </div>
  );
}
