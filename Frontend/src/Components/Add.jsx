import React, { useState } from 'react';
import '../Css/Add.css';
import Navbar from './Navbar';
import axios from 'axios';

export default function Add() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [additional, setAdditional] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState([]);

  // List of available services
  const services = [
    'Wi-Fi',
    'Parking',
    'Pool',
    'Gym',
    'Restaurant',
    'Room Service',
    'Laundry Service',
    'Spa',
    'Business Center',
    'Airport Shuttle'
  ];

  const categories = ['Daily', 'Monthly', 'Yearly', 'Permanent'];

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setSelectedServices((prev) =>
      checked
        ? [...prev, value]
        : prev.filter((service) => service !== value)
    );
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setSelectedCategory(value);
  };

  const handleAdditionalKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (additional.trim() !== '') {
        setAdditionalDetails((prev) => [...prev, additional.trim()]);
        setAdditional('');
      }
    }
  };

  const handleAdditionalDelete = (index) => {
    setAdditionalDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const placeAdder = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('services', JSON.stringify(selectedServices));
    formData.append('category', selectedCategory);
    formData.append('checkIn', checkIn);
    formData.append('checkOut', checkOut);
    formData.append('image', image);
    formData.append('additional', JSON.stringify(additionalDetails));

    axios
      .post('/addplace', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // Clear form
    setName('');
    setDescription('');
    setLocation('');
    setPrice('');
    setImage(null);
    setSelectedServices([]);
    setSelectedCategory('');
    setCheckIn('');
    setCheckOut('');
    setAdditionalDetails([]);
  };

  return (
    <div className='add'>
      <Navbar text='Feed' text2='Add' hideStartButton={true} />
      <div className='add__container'>
        <h2>Add a new post</h2>
        <form onSubmit={placeAdder}>
          Name
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
          <br />
          Description
          <textarea  className=''
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            rows={4} // Adjust the number of rows as needed
            cols={50} // Adjust the number of columns as needed
          />
          <br />
          Location
          <input type='text' value={location} onChange={(e) => setLocation(e.target.value)} />
          <br />
          Price
          <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} />
          <br />
          Services
          <div>
            {services.map((service) => (
              <label key={service}>
                <input
                  type='checkbox'
                  value={service}
                  checked={selectedServices.includes(service)}
                  onChange={handleServiceChange}
                />
                {service}
              </label>
            ))}
          </div>
          <br />
          Category
          <div>
            {categories.map((category) => (
              <label key={category}>
                <input
                  type='radio'
                  name='category'
                  value={category}
                  checked={selectedCategory === category}
                  onChange={handleCategoryChange}
                />
                {category}
              </label>
            ))}
          </div>
          <br />
          Check-In Time
          <input type='time' value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          <br />
          Check-Out Time
          <input type='time' value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          <br />
          Image
          <input type='file' onChange={(e) => setImage(e.target.files[0])} />
          <br />
          Additional Details
          <input
            type="text"
            value={additional}
            onChange={(e) => setAdditional(e.target.value)}
            onKeyDown={handleAdditionalKeyDown}
          />
          <div className="additional-list">
            {additionalDetails.map((detail, index) => (
              <div key={index} className="additional-item">
                {detail}
                <button type="button" onClick={() => handleAdditionalDelete(index)}>Delete</button>
              </div>
            ))}
          </div>
          <br />
          <button className='submit' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
