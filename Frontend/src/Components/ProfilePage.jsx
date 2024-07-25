import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfilePage() {
  const [data, setData] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/userprofile')
      .then((res) => {
        setData(res.data); // Ensure you set the correct data property
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      }); 
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profilepage">
      <div className="pphead">Profile</div>
      <div className="ppcover"><i className="bi bi-pencil-square"></i></div>
      <div className="ppcircle"></div>
      <div className="ppinfo">
        {data ? data.username : 'No user data available'}
      </div>
    </div>
  );
}
