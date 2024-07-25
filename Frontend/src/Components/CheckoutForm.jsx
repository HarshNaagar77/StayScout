// CheckoutForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { data } = await axios.post('http://localhost:3000/create-payment-intent', {
        amount: 5000, // Replace with actual amount
        currency: 'usd',
      });

      const { clientSecret } = data;

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
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {error && <div>{error}</div>}
      {paymentSuccess && <div>Payment succeeded!</div>}
    </form>
  );
};

export default CheckoutForm;
