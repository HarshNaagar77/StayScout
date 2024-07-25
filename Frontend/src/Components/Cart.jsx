import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../Css/Cart.css';
import { useNavigate, useParams } from 'react-router-dom';


export default function Cart() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const bookingData = localStorage.getItem('bookingData');
    if (bookingData) {
      setData(JSON.parse(bookingData));
    } else {
      console.log('No booking data found');
    }
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }
  const checkInDate = data.bCheckIn;
  const checkOutDate = data.bCheckOut;

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const isValidDate = (date) => date instanceof Date && !isNaN(date);
  let dayDifference = NaN;

  if (isValidDate(checkIn) && isValidDate(checkOut)) {
    const timeDifference = checkOut.getTime() - checkIn.getTime();
    dayDifference = timeDifference / (1000 * 60 * 60 * 24);
  } else {
    console.error('Invalid date(s) provided.');
  }

  const navigator = () => {
    navigate('/payment')
  }


  return (
    <div>
      <Navbar hideStartButton={true} hideSearch={true} />
    <div className="maincart">
        <div className="cart1">
            <h4>Rental Details</h4>
            <div className='biller'>
              <span className="label">Biller Name:</span> {data.bName}
            </div>
            <div className='in'>
              <span className="label">Check-in Date:</span> {checkInDate}
            </div>
            <div className='out'>
              <span className="label">Check-out Date:</span> {checkOutDate}
            </div>
            <div className='days'>
              <span className="label">Total Days:</span> {dayDifference}
            </div>
            <div className='g'>
              <span className="label">Total Guests:</span> {data.bGuest}
            </div>
            <div className="location">
              <span className="label">Place location : </span> {data.location}
            </div>
            <div className="phone">
              <span className="label">Phone number:</span> {data.bPhone}
            </div>
            <div className="phone">
              <span className="label">Payment currency : </span> Inr
            </div>
</div>

        <div className="cart2">
            <div className='price'>
              <span className="label">Price :</span> ₹ {data.price} / Day
            </div>
            <div className='subtotal'>
              <span className="label">Sub total :</span> ₹ {data.price * dayDifference} 
            </div>
            <div className='tax'>
              <span className="label">Tax : </span> ₹ {data.price * 0.12} 
            </div>
            <div className='fee'>
              <span className="label">Platform fee : </span> ₹ {data.price * 0.03} 
            </div>
            <div className='total'>
              <span className="label tlabel">Total : </span>  <span className="tvalue">₹ {Math.round(data.price + data.price * dayDifference + data.price * 0.12 + data.price * 0.03)} </span>
            </div>
            <button className="pay" onClick={navigator} >Pay now</button>

        </div>
      </div>
    </div>
  );
}
