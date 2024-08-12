import React, { useEffect, useState } from 'react';
import '../Css/Feed.css';
import '../Css/Feed_mobile.css';
import axios from 'axios';
import Navbar from './Navbar';
import Skeleton from 'react-loading-skeleton';
import CardSkeleton from './CardSkeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
  
    // Start both the data fetching and a 3-second timer simultaneously
    Promise.all([
      axios.get('https://stayscout.onrender.com/render').then(res => shuffleArray(res.data)),
      new Promise(resolve => setTimeout(resolve, 800)) // 3-second delay
    ])
    .then(([shuffledPosts]) => {
      setPosts(shuffledPosts);
      setLoading(false); // Set loading to false when both promises have resolved
    })
    .catch(err => {
      console.error('Error:', err);
      setLoading(false); // Ensure loading is set to false even if there's an error
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.price.toString().includes(searchQuery) ||
    post.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toString().toLowerCase().includes(searchQuery.toLowerCase())
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
        {loading ? (
          // Display skeleton loaders while data is loading
          Array(10).fill().map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <Link key={index} className="place" to={'/place/' + post._id}>
              <img className="feedimg" src={`https://stayscout.onrender.com/uploads/${post.images[1]}`} alt="place" />
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
            </Link>
          ))
        ) : (
          <p>We couldn't find any places matching your search. Please try different keywords.</p>
        )}
      </div>
    </div>
  );
}
