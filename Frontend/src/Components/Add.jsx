import React, { useState } from 'react';
import '../Css/Add.css';
import Navbar from './Navbar';
import axios from 'axios';
import add from '../assets/houseimg2.png';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { placeSchema } from './validationSchema';

export default function Add() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [guest, setGuest] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [additional, setAdditional] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState([]);
  
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const services = [
    'Wi-Fi',
    'Parking',
    'Pool',
    'Gym',
    'Restaurant',
    'Room Service',
    'Laundry Service',
    'Spa',
  ];

  const categories = ['Day', 'Month', 'Year', 'Permanent'];

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setSelectedServices((prev) =>
      checked ? [...prev, value] : prev.filter((service) => service !== value)
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

  const validateForm = () => {
    try {
      placeSchema.parse({
        title,
        description,
        location,
        price,
        guest,
        checkIn,
        checkOut,
        selectedServices,
        selectedCategory,
        additionalDetails
      });
      setErrors({});
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const fieldErrors = e.errors.reduce((acc, err) => {
          if (err.path.length) {
            acc[err.path[0]] = err.message;
          }
          return acc;
        }, {});
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const placeAdder = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('guest', guest);
    formData.append('services', JSON.stringify(selectedServices));
    formData.append('category', selectedCategory);
    formData.append('checkIn', checkIn);
    formData.append('checkOut', checkOut);
    images.forEach((image) => {
      formData.append('images', image);
    });
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
        navigate('/addsuccess');
      })
      .catch((err) => {
        console.log(err);
      });

    // Clear form
    setTitle('');
    setDescription('');
    setLocation('');
    setPrice('');
    setImages([]);
    setImagePreviews([]);
    setSelectedServices([]);
    setSelectedCategory('');
    setCheckIn('');
    setCheckOut('');
    setAdditionalDetails([]);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    console.log(files);
  };

  const dismissal = () => {
    const pop = document.querySelector('.popup');
    if (pop) pop.style.display = 'none';
  };

  return (
    <div className='add'>
      <Navbar text='Feed' text2='Add' hideStartButton={true} />
      <div className="popup">
        <div className="card">
          <button type="button" className="dismiss" onClick={dismissal}>×</button>
          <div className="header">
            <div className="image">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
                <g id="SVGRepo_iconCarrier">
                  <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#000000" d="M20 7L9.00004 18L3.99994 13"></path>
                </g>
              </svg>
            </div>
            <div className="content">
              <span className="title">Place validated</span>
              <br />
              <p className="message">Your listing has been successfully updated and is now live. Thank you for contributing! Others can now view and explore it.</p>
            </div>
            <div className="actions">
              <button type="button" className="history" onClick={dismissal}>Ok</button>
            </div>
          </div>
        </div>
      </div>
      <div className="outside">
        <img src={add} alt="" className='addimg' />
        <div className="mainadd">
          <div className="addbg"></div>
          <form onSubmit={placeAdder} className='addform'>
            <h2 className='addhead'>Add Your Place</h2>
            <label >
              <div className='errdiv'>
                Title {errors.title && <p className='error'>{errors.title}</p>}
                </div>
              <input
                className='input text'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter the title'
              />
              
            </label>
            <br />
            <label>
              <div className="errdiv">
              Description {errors.description && <p className='error'>{errors.description}</p>}
              </div>
              <textarea
                className='input'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                cols={50}
                placeholder='Enter the description'
              />
              
            </label>
            <br />
            <label>
              <div className="errdiv">
              Location{errors.location && <p className='error'>{errors.location}</p>}
              </div>
              <input
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder='Enter the location'
              />
              
            </label>
            <br />
            <label>
              <div className="errdiv">
              Price (in Rupees){errors.price && <p className='error'>{errors.price}</p>}
              </div>
              <input
                type='text'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder='Enter the price'
              />
              
            </label>
            <br />
            <div className="category">
              <div className='errdiv'>
              Category (per){errors.selectedCategory && <p className='error'>{errors.selectedCategory}</p>}
              </div>
              <div className='catinput'>
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
              
            </div>
            <div>
              <div className="errdiv">
              Services{errors.selectedServices && <p className='error'>{errors.selectedServices}</p>}
              </div>
              <div className='services'>
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
              
            </div>
            <br />
            <label>
              <div className="errdiv">
              Number of guests{errors.guest && <p className='error'>{errors.guest}</p>}
              </div>
              <input
                type='text'
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
                placeholder='Enter the number of guests'
              />
              
            </label>
            <br />
            <label>
              <div className="errdiv">
              Check-In{errors.checkIn && <p className='error'>{errors.checkIn}</p>}
              </div>
              <input
                type='date'
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
              
            </label>
            <br />
            <label>
              <div className="err div">
              Check-Out{errors.checkOut && <p className='error'>{errors.checkOut}</p>}
              </div>
              <input
                type='date'
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
              
            </label>
            <br />
            <span className="form-title">Upload your files</span>
            <p className="form-paragraph"></p>
            <label className="drop-container">
              
              <span className="drop-title">Drop files here</span>
              or
              <input type='file' onChange={handleImageChange} id="file-input" multiple />
            </label>
            {imagePreviews.length > 0 && (
              <div className="image-preview">
                {imagePreviews.map((preview, index) => (
                  <img key={index} src={preview} alt={`Preview ${index}`} className='imgpre' />
                ))}
              </div>
            )}
            <br />
            <label>
              Additional Details
              <input
                type="text"
                value={additional}
                onChange={(e) => setAdditional(e.target.value)}
                onKeyDown={handleAdditionalKeyDown}
                placeholder='Enter additional details and press Enter'
              />
            </label>
            <div className="additional-list">
              {additionalDetails.map((detail, index) => (
                <div key={index} className="additional-item">
                  {detail}
                  <button type="button" onClick={() => handleAdditionalDelete(index)}>X</button>
                </div>
              ))}
            </div>
            <br />
            <button className='submit addsubmit' type='submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
