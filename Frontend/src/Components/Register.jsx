import React, { useState } from 'react';
import Navbar from './Navbar';
import '../Css/RegisterForm.css';
import '../Css/Register_mobile.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { registerSchema } from './validationSchema'; // Import the Zod schema

axios.defaults.withCredentials = true;

function Register() {
  return (
    <div>
      <Navbar hideStartButton={true} hideSearch={true} hideProfile={true} />
      <RegisterForm />
    </div>
  );
}

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    try {
      registerSchema.parse({ username, email, password });
      setErrors({}); // Clear errors if validation passes
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const formattedErrors = e.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop submission if validation fails

    try {
      const response = await axios.post('https://stayscout.onrender.com/registeruser', {
        username,
        email,
        password,
      });
      console.log(response.data.message);
      setUsername('');
      setEmail('');
      setPassword('');
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
          <button type='button' className='demo'>Already have an account? <span className='loginbtn'>Login</span></button>
        </Link>
      </div>
      <form className='form1' onSubmit={submitHandler}>
        <div>
          <label className='errlabel'>Username {errors.username && <p className='error'>{errors.username}</p>}</label>
          <input
            className='username'
            placeholder='Enter your username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className='errlabel'>Email  {errors.email && <p className='error'>{errors.email}</p>}</label>
          <input
            className='email'
            placeholder='Enter your email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
        </div>
        <div>
          <label className='errlabel'>Password  {errors.password && <p className='error'>{errors.password}</p>}</label>
          <input
            className='password'
            placeholder='Enter your password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
        </div>
        <button type='submit' className='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Register;
