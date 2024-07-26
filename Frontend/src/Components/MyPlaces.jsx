import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function MyPlaces() {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await axios.get('http://localhost:3000/userprofile');
        setData(userProfile.data);
      } catch (err) {
        setError(err.message);
      }
  
      try {
        const userPlace = await axios.get('http://localhost:3000/userplace');
        console.log('UserPlace Response:', userPlace.data); // Add this line
        setData2(Array.isArray(userPlace.data) ? userPlace.data : []); // Ensure data2 is always an array
      } catch (err) {
        setError2(err.message);
      }

      // Simulate a delay of at least 1 second before hiding the loading state
      setTimeout(() => {
        setLoading(false);
        setLoading2(false);
      }, 800); // 1000 milliseconds = 1 second
    };
  
    fetchData();
  }, []);
  
  if (loading || loading2) return (
    <div className='myplaces'>
      <div className="pphead"><Skeleton></Skeleton></div>
      <div className="myplacesnumber">
        <Skeleton height={60}/>
      </div>
      <div className="placeflex">
        {data2.map((res, index) => (
          <div key={index}>
            <Link to={`/place/${res._id}`}>
              <Skeleton  height={250} width={250}/>
              <div className="placecontent">
                <div className="feedservices">
                 <Skeleton width={100} height={20}/>
                 
                </div>
                <h3 className="feedtitle">
                  <Skeleton width={100} height={20}/>
                </h3>
                <h5 className="feedlocation">
                  <Skeleton width={100} count={2} height={10}/>
                </h5>
                <p className="feedguest"><Skeleton width={100} height={10}/></p>

              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
  if (error) return <div>Error: {error}</div>;
  if (error2) return <div>Error: {error2}</div>;

  return (
    <div className='myplaces'>
      <div className="pphead">Places</div>
      <div className="myplacesnumber">
        Total Places Hosted: {data?.place?.length || 0}
      </div>
      <div className="placeflex">
        {data2.map((res, index) => (
          <div key={index}>
            <Link to={`/place/${res._id}`}>
              <img className="feedimg" src={`http://localhost:3000/uploads/${res.images[1]}`} alt="place" />
              <div className="placecontent">
                <div className="feedservices">
                  {res.services.slice(0, 3).map((service, i) => (
                    <span key={i} className="feedservice">{service}</span>
                  ))}
                  {res.services.length > 3 && (
                    <span className="feedmore">+{res.services.length - 3} more</span>
                  )}
                </div>
                <h3 className="feedtitle">{res.title}</h3>
                <h5 className="feedlocation">{res.location}</h5>
                <p className="feedguest">{`No. of guests: ${res.guest}`}</p>
                <div className="prices">
                  <p className="feedprice"><span className="price">₹{res.price}</span> / {res.category}</p>
                  <p className="feedrating"><i className="bi bi-heart"></i></p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
