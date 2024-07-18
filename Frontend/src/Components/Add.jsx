import React, { useState } from 'react';
import '../Css/Add.css';
import Navbar from './Navbar';
import axios from 'axios';

export default function Add() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const placeAdder = (e) => {
    e.preventDefault();
    axios
      .post(
        '/addplace',
        {
          name,
          description,
          location,
          price,
          image,
        },
        { withCredentials: true } // Ensure cookies are sent
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setName('');
    setDescription('');
    setLocation('');
    setPrice('');
    setImage('');
  };

  return (
    <div className='add'>
      <Navbar text='Feed' text2='Add' hideStartButton={true}></Navbar>

      <div className='add__container'>
        <h2>Add a new post</h2>
        <form action='' onSubmit={placeAdder}>
          Name <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
          Description <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
          Location <input type='text' value={location} onChange={(e) => setLocation(e.target.value)} />
          Price <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} />
          Image <input type='text' value={image} onChange={(e) => setImage(e.target.value)} />
          <button className='submit' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
