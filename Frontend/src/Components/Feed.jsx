import React, { useEffect, useState } from 'react';
import '../Css/Feed.css';
import axios from 'axios';
import Navbar from './Navbar';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const logout = async () => {
    try {
      await axios.post('http://localhost:3000/logout');
      localStorage.removeItem('token');
      // Optionally, redirect user after logout
    } catch (error) {
      // Handle logout error
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3000/render')
    .then(res => {
      setPosts(res.data);
    })
    .catch(err => {
      console.error('Error:', err);
    });
  },[])

  return (
    <div className='feed'>
      <Navbar text='Feed' text2='Add' hideStartButton={true} />
      {/* <div className="logout">
        <button onClick={logout} className='logout-button'>Logout</button>
      </div> */}

      <div className="places">
        {posts.map((post, index) => {
          return (
            <div key={index} className="place">
              <img className='feedimg' src={`http://localhost:3000/uploads/${post.image}`} alt="place" />
              <h3 className="feedtitle">{post.title}</h3>
              <h5 className="feedlocation">{post.location}</h5>
              <p className="feedguest">{`No. of guest : ${post.guest}`}</p>
              <p className="feedprice">{`Price : ₹${post.price} / ${post.category}`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
