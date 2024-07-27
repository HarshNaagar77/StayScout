import React, { useEffect, useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import cardimg from '../assets/card.png'
import Navbar from '../Components/Navbar'


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [data, setData] = useState(null);
  const [fprice, setFprice] = useState(null);
  const [loading, setLoading] = useState(false); // Add a loading state
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const bookingData = localStorage.getItem('bookingData');
    if (bookingData) {
      const parsedData = JSON.parse(bookingData);
      setData(parsedData);

      // Calculate final price
      const checkInDate = new Date(parsedData.bCheckIn);
      const checkOutDate = new Date(parsedData.bCheckOut);
      const isValidDate = (date) => date instanceof Date && !isNaN(date);

      if (isValidDate(checkInDate) && isValidDate(checkOutDate)) {
        const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
        const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

        const calculatedPrice = Math.round(
          parsedData.price * dayDifference +
          parsedData.price * 0.12 +
          parsedData.price * 0.03
        );
        setFprice(calculatedPrice);
        localStorage.setItem('fprice', calculatedPrice.toString());
      } else {
        console.error('Invalid date(s) provided.');
      }
    } else {
      console.log('No booking data found');
    }
  }, [id]);

  useEffect(() => {
    const paymentSuccessFlag = localStorage.getItem('paymentSuccess');
    if (paymentSuccessFlag === 'true') {
      localStorage.removeItem('paymentSuccess'); // Clear the flag
      navigate('/feed'); // Redirect to /feed
    }
  }, [navigate]);

  if (!data || fprice === null) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || loading) { // Check loading state
      return;
    }

    setLoading(true); // Set loading to true

    const cardElement = elements.getElement(CardNumberElement);

    try {
      const { data: response } = await axios.post('http://localhost:3000/create-payment-intent', {
        amount: fprice, // Use the calculated final price
        currency: 'usd',
      });

      const { clientSecret } = response;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Your Name',
          },
        },
      });

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);

        const bdata = {
          bName: data.bName,
          bCheckIn: data.bCheckIn,
          bCheckOut: data.bCheckOut,
          bGuest: data.bGuest,
          bPhone: data.bPhone,
        }
        axios
          .post(`http://localhost:3000/book/${data.placeid}`, bdata)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });

        localStorage.setItem('paymentSuccess', 'true'); // Set flag in local storage
        localStorage.removeItem('bookingData')
        localStorage.removeItem('finalPrice')
        localStorage.removeItem('fprice')
        navigate('/success'); // Navigate to success page
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Set loading to false once payment is complete
    }
  };

  // Define styling for the Stripe Elements
  const cardStyle = {
    style: {
      base: {
        color: 'black',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <div>
      <Navbar hideStartButton={true} hideSearch={true} />
      <div className="mainpay">
        <div className="cart1">
          <h4>Rental Details</h4>
          <div className='biller'>
            <span className="label">Biller Name:</span> {data.bName}
          </div>
          <div className='in'>
            <span className="label">Check-in Date:</span> {data.bCheckIn}
          </div>
          <div className='out'>
            <span className="label">Check-out Date:</span> {data.bCheckOut}
          </div>
          <div className='days'>
            <span className="label">Total Days:</span> {Math.round(fprice / data.price)}
          </div>
          <div className='g'>
            <span className="label">Total Guests:</span> {data.bGuest}
          </div>
          <div className="location">
            <span className="label">Place location:</span> {data.location}
          </div>
          <div className="phone">
            <span className="label">Phone number:</span> {data.bPhone}
          </div>
          <div className="phone">
            <span className="label">Payment currency:</span> INR
          </div>
        </div>

        <form onSubmit={handleSubmit} className='payform'>
          <div className="prices4">
            <span className="label"></span> ₹ {fprice}
          </div>

          <div className="org">
            <label>
              Card Number <br />
              <img src={cardimg} alt="" className='cardimg' />
              <div style={{ border: '1px solid rgb(0, 0, 0, 0.3)', padding: '6px', borderRadius: '10px', marginTop: '5px', paddingLeft: '10px' }}>
                <CardNumberElement options={cardStyle} />
              </div>
            </label>
            <label>
              Expiration Date
              <div style={{ border: '1px solid rgb(0, 0, 0, 0.3)', padding: '6px', borderRadius: '10px', marginTop: '5px', paddingLeft: '10px' }}>
                <CardExpiryElement options={cardStyle} />
              </div>
            </label>
            <label>
              CVC
              <div style={{ border: '1px solid rgb(0, 0, 0, 0.3)', padding: '6px', borderRadius: '10px', marginTop: '5px', paddingLeft: '10px' }}>
                <CardCvcElement options={cardStyle} />
              </div>
            </label>
          </div>
          <button type="submit" className='orgpay' disabled={!stripe || loading}>
            {loading ? 'Processing...' : 'Pay'}
          </button>
          {error && <div>{error}</div>}
          {/* {paymentSuccess && <div>Payment succeeded!</div>} */}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
