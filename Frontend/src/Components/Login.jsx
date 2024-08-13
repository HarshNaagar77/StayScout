import React, { useState } from 'react';
import Navbar from './Navbar';
import '../Css/Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { loginSchema } from './validationSchema'; // Import the Zod schema

export default function Login() {
  return (
    <div>
      <Navbar hideStartButton={true} hideSearch={true} hideProfile={true} />
      <LoginPage />
    </div>
  );
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    try {
      loginSchema.parse({ email, password });
      setError(''); // Clear the overall error message if validation passes
      setEmailError(''); // Clear individual field errors
      setPasswordError('');
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        // Set errors for respective fields
        e.errors.forEach((err) => {
          if (err.path.includes('email')) {
            setEmailError(err.message);
          }
          if (err.path.includes('password')) {
            setPasswordError(err.message);
          }
        });
        setError(e.errors[0]?.message || 'An error occurred'); // Set only the first error message
      } else {
        console.error('Unexpected error:', e);
      }
      return false;
    }
  };

  async function handleLogin(e) {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password }, { withCredentials: true });
      localStorage.setItem('token', response.data.token);
      setEmail('');
      setPassword('');
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
        <Link to="/register">
          <button type='button' className='submit2 submit'>New user? Register now</button>
        </Link>
      </div>
      <form className='form' onSubmit={handleLogin}>

        <div>
          <label className='errlabel' htmlFor='email'>Email {emailError && <p className='error'>{emailError}</p>}</label>
          <input
            className='email'
            placeholder='Enter your email'
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required='true'
          />
          {/* Display email-specific error below the email input */}
          
        </div>
        <div>
          <label className='errlabel' htmlFor='password'>Password{passwordError && <p className='error'>{passwordError}</p>}</label>
          <input
            className='password'
            placeholder='Enter your password'
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-required='true'
          />
          {/* Display password-specific error below the password input */}
          
        </div>
        <button type='submit' className='submit loginsubmit'>Login</button>
      </form>
    </div>
  );
}
