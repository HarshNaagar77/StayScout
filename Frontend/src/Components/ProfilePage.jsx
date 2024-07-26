import React, { useEffect, useState } from 'react';
import axios from 'axios';
import pfp from '../assets/pfp.webp';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProfilePage() {
  const [data, setData] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timeoutId;

    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/userprofile');
        setData(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        // Ensure loading state is displayed for at least 800ms
        timeoutId = setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };

    fetchData();

    // Cleanup timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) return (
    <div className="profilepage">
      <div className="pphead"><Skeleton /></div>
      <div className="ppcover"></div>
      <div className="ppcircle">
        <Skeleton circle height={100} width={100} />
      </div>
      <div className="ppinfo">
        <div className="ppinfoname"><Skeleton width={150} /></div>
        <div className="ppinfoemail"><Skeleton width={200} /></div>

        <div className="ppcards">
          <div className="ppplace">
            <Skeleton width={100} />
            <br />
            <div><Skeleton width={155} height={20}/></div>
          </div>
          <div className="ppreview">
            <Skeleton width={50} />
            <br />
            <div><Skeleton width={155} height={20}/></div> 
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profilepage">
      <div className="pphead">Profile</div>
      <div className="ppcover"><i className="bi bi-pencil-square"></i></div>
      <div className="ppcircle">
        <img src={pfp} alt="Profile" />
      </div>
      <div className="ppinfo">
        <div className="ppinfoname">
          {data.username}
        </div>
        <div className="ppinfoemail">
          {data.email}
        </div>

        <div className="ppcards">
          <div className="ppplace">
            <span>{data.place.length || 0}</span> {/* Display 0 if place length is not available */}
            <br />
            <div>Total Places Hosted</div>
          </div>
          <div className="ppreview">
            <span>{data.reviews || '--'}</span> {/* Display '--' if reviews count is not available */}
            <br />
            <div>Your Reviews</div>
          </div>
        </div>
      </div>
    </div>
  );
}
