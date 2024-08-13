import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function MyBooking() {
  const [data, setData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDelay, setLoadingDelay] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timeoutId;

    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get('http://localhost:3000/findbook'),
          axios.get('http://localhost:3000/findbooking'),
        ]);
        setData(response1.data);
        setBookingData(response2.data);
      } catch (err) {
        setError(err.message);
      } finally {
        // Ensure loading state is displayed for at least 1 second
        timeoutId = setTimeout(() => {
          setLoading(false);
          setLoadingDelay(false);
        }, 1000);
      }
    };

    fetchData();

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  if (loading || loadingDelay) {
    return (
      <div className='myplaces'>
        <div className="pphead"><Skeleton /></div>
        <div className="myplacesnumber">
          <Skeleton height={60} />
        </div>
        <div className="placeflex">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <Skeleton height={250} width={250} />
              <h3 className="feedtitle">
                        <Skeleton width={100} height={20}/>
                      </h3>
                      <h5 className="feedlocation">
                        <Skeleton width={100} count={2} height={10}/>
                      </h5>
                      <p className="feedguest"><Skeleton width={100} height={10}/></p>
            </div>
          ))}

        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mybook">
      <div className="pphead">Bookings</div>
      <div className="myplacesnumber">
        Total Booked places: {bookingData.length}
      </div>
      <div>
        {bookingData.length > 0 ? (
          <div className='placeflex'>
            {bookingData.map((booking, index) => (
              <div key={index} className="booking-item">
                <img className="feedimg" src={`http://localhost:3000/uploads/${booking.images[0]}`} alt="place" />
                <div className="feedservices">
                  {booking.services.slice(0, 3).map((service, i) => (
                    <span key={i} className="feedservice">{service}</span>
                  ))}
                  {booking.services.length > 3 && (
                    <span className="feedmore">+{booking.services.length - 3} more</span>
                  )}
                </div>
                <h3 className="feedtitle">{booking.title}</h3>
                <h5 className="feedlocation">{booking.location}</h5>
                <div className="prices">
                  <p className="feedprice"><span className="price">₹{booking.price}</span> / {booking.category}</p>
                  <p className="feedrating"><i className="bi bi-heart"></i></p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No bookings found</div>
        )}
      </div>
    </div>
  );
}
