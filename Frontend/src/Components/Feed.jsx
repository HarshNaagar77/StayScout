import React, { useEffect, useState } from 'react';
import '../Css/Feed.css';
import '../Css/Feed_mobile.css';
import axios from 'axios';
import Navbar from './Navbar';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    axios.get('http://localhost:3000/render')
      .then(res => {
        const shuffledPosts = shuffleArray(res.data);
        setPosts(shuffledPosts);
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }, []);

  const handleSearchChange = (event) => {
    
    setSearchQuery(event.target.value);
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.price.toString().includes(searchQuery) ||
    post.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toString().toLowerCase().includes(searchQuery.toLowerCase()) // Ensure category is a string
  );

  return (
    <div className='feed'>
      <Navbar 
        text='Feed' 
        text2='Add' 
        hideStartButton={true} 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <div className="places">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div key={index} className="place">
              <img className="feedimg" src={`http://localhost:3000/uploads/${post.image}`} alt="place" />
              <div className="placecontent">
                <div className="feedservices">
                  {post.services.slice(0, 3).map((service, i) => (
                    <span key={i} className="feedservice">{service}</span>
                  ))}
                  {post.services.length > 3 && (
                    <span className="feedmore">+{post.services.length - 3} more</span>
                  )}
                </div>
                <h3 className="feedtitle">{post.title}</h3>
                <h5 className="feedlocation">{post.location}</h5>
                <p className="feedguest">{`No. of guests: ${post.guest}`}</p>
                <div className="prices">
                  <p className="feedprice"><span className="price">₹{post.price}</span> / {post.category}</p>
                  <p className="feedrating"><i className="bi bi-heart"></i></p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>We couldn't find any places matching your search. Please try different keywords.</p>
        )}
      </div>
    </div>
  );
}
