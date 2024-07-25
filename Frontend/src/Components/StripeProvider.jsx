
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Pg8asRrdvF7ebjybDhFMvcE6QCV9Tmke1D1spob1zuIDrhCeRWhUQH5fnuE6SZEwxZBrbwt5CrhfPABPkclbMyG00f4otuw6M'); 
const StripeProvider = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
