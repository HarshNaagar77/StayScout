import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Success.css'; // Import the CSS file

export default function AddSuccess() {
  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-circle">
          <div className="success-circle-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="success-tick"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h1 className="success-title2">Place added successfully !</h1>
      </div>
      <p className="success-message">
        Your place has been processed successfully. Thank you for your business!
      </p>
      <Link to={'/feed'} className="success-link">Go Back</Link>
    </div>
  );
}
