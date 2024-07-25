import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import '../Css/PlacePage.css';
import '../Css/Navbar.css';
import logo from '../assets/logo4.png';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bCheckIn , setBCheckIn] = useState('')
  const [bCheckOut , setBCheckOut] = useState('')
  const [bName , setBName] = useState('')
  const [bPhone , setBPhone] = useState('')
  const [bGuest , setBGuest] = useState('')

  const navigate = useNavigate()


  useEffect(() => {
    setLoading(true); // Ensure loading is true at the start
    const fetchData = axios.get(`http://localhost:3000/place/${id}`);
    const timeout = new Promise(resolve => setTimeout(resolve, 800)); // 1 second timeout
  
    Promise.all([fetchData, timeout]).then(([res]) => {
      setPlace(res.data);
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching place data:', error);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (place?.user) {
      axios.get(`http://localhost:3000/user/${place.user}`)
        .then(res => {
          setUser(res.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [place?.user]);

  const bookHandler = (e) => {
    e.preventDefault()
    const location = place.location
    const price = place.price
    const bData = {
      bName,
      bCheckIn,
      bCheckOut,
      bGuest,
      bPhone,
      location,
      price,
    }

    axios
    .post(`http://localhost:3000/book/${place._id} `, bData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
    localStorage.setItem('bookingData', JSON.stringify(bData));
    navigate(`/payment/${place._id}`);
    setBCheckOut('')
    setBCheckIn('')
    setBGuest('')
    setBName('')
    setBPhone('')

    
  }

  if (loading) {
    return (
      <div>
        <Navbar
          text='Feed'
          text2='Add'
          hideStartButton={true}
        />
        <div className='navbar'>
          <div className='logoname'>
            <img className='logo' src={logo} alt="Logo" />
            <p className='logotext'>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'logotexxt active' : 'logotexxt')}>StayScout</NavLink>
            </p>
          </div>
          <div>
            <ul className='innerfeed'>
              <li><NavLink to='/feed'>Feed</NavLink></li>
              <li><NavLink to='/add'>Add</NavLink></li>
            </ul>
          </div>
          <div className='rightnav'>
            <i className="bi bi-person"></i>
          </div>
        </div>
        <div className="inner">
          <div className="inner1">
            <div className="inner1first">
              <Skeleton height={400} width={970} />
            </div>
            <div className="inner1second">
              <Skeleton height={190} width={350} />
              <Skeleton height={190} width={350} />
            </div>
          </div>
          <div className="maininner2">
            <div className="inner2">
              <Skeleton count={4} />
              <Skeleton height={30} width="60%" />
              <Skeleton height={40} width="80%" />
              <Skeleton height={20} width="40%" />
            </div>
            <div className="inner2sec">
              <div className="placecard">
                <Skeleton height={60} width={200}  style={{marginLeft : '20px' , marginTop : '20px'}}/>
                <form className="cardform">
                  <div className="form-group">
                    <Skeleton height={30} width={100} />
                    <Skeleton height={30} width={300} />
                  </div>
                  <div className="form-group">
                    <Skeleton height={30} width={100} />
                    <Skeleton height={30} width={300} />
                  </div>
                  <div className="form-group">
                    <Skeleton height={30} width={100} />
                    <Skeleton height={30} width={300} />
                  </div>
                  <div className="form-group">
                    <Skeleton height={30} width={100} />
                    <Skeleton height={30} width={300} />
                  </div>
                  <div className="form-group">
                    <Skeleton height={30} width={100} />
                    <Skeleton height={30} width={300} />
                  </div>
                  <Skeleton height={40} width={300} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar
        text='Feed'
        text2='Add'
        hideStartButton={true}
      />
      <div className='navbar'>
        <div className='logoname'>
          <img className='logo' src={logo} alt="Logo" />
          <p className='logotext'>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'logotexxt active' : 'logotexxt')}>StayScout</NavLink>
          </p>
        </div>
        <div>
          <ul className='innerfeed'>
            <li><NavLink to='/feed'>Feed</NavLink></li>
            <li><NavLink to='/add'>Add</NavLink></li>
          </ul>
        </div>
        <div className='rightnav'>
          <i className="bi bi-person"></i>
        </div>
      </div>
      <div className="inner">
        <div className="inner1">
          <div className="inner1first">
            {place.images && place.images[0] ? (
              <img
                className='innerimg'
                src={`http://localhost:3000/uploads/${place.images[0]}`}
                alt="place"
                loading="lazy" // Lazy loading
              />
            ) : (
              <Skeleton height={400} width={970} />
            )}
          </div>
          <div className="inner1second">
            {place.images ? (
              place.images
                .filter((_, index) => index !== 0)
                .slice(0, 2)
                .map((image, index) => (
                  <img
                    key={index}
                    className='innerimg2'
                    src={`http://localhost:3000/uploads/${image}`}
                    alt="place"
                    loading="lazy" // Lazy loading
                  />
                ))
            ) : (
              <>
                <Skeleton height={190} width={350} />
                <Skeleton height={190} width={350} />
              </>
            )}
          </div>
        </div>
        <div className="maininner2">
          <div className="inner2">
            <h3 className='placetitle'>{place.title}</h3>
            <p className='placedesc'>{place.description}</p>
            <p className='placelocation'>{place.location}</p>
            <p className='host'>Hosted by {user && <p>{user.username}</p>} <br /> {user && <p>{user.email}</p>}</p>
            <div className="placeservices">
              <h4>What this place offers</h4>
              <div>
                {place.services.map((service, index) => (
                  <ul className='placeser' key={index}>
                    <li>{service}</li>
                  </ul>
                ))}
              </div>
            </div>
            <div className="available">
              <h4>Available</h4>
              <div className="avail">
                From: <span>{place.checkIn}</span> <br />
                To: <span className='tobefixed'>{place.checkOut}</span> <br />
              </div>
            </div>
            <div className="additional">
              <h4>Additional Information</h4>
              {place.additional.map((add, index) => (
                <ul className='placeser' key={index}>
                  <li>{add}</li>
                </ul>
              ))}
            </div>
          </div>
          <div className="inner2sec">
            <div className="placecard">
              <div className="cardprice">
                <h4>₹{place.price} / {place.category}</h4>
              </div>
              <form className="cardform" onSubmit={bookHandler}>
                <div className="form-group">
                  <label>Check-in</label> <br />
                  <input type="date" className='cardcheckin date' min={place.checkIn} max={place.checkOut} onChange={ (e) => {
                    setBCheckIn(e.target.value)
                  }} />
                </div>
                <div className="form-group">
                  <label>Check-out</label> <br />
                  <input type="date" className='cardcheckout date'  min={place.checkIn} max={place.checkOut} onChange={(e) => {
                    setBCheckOut(e.target.value)
                  }} />
                </div>
                <div className="form-group">
                  <label>Guests</label> <br />
                  <select className='cardguest' onChange={(e) => {
                    setBGuest(e.target.value)
                  }}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Name</label> <br />
                  <input type="text" className='cardcheckout' placeholder='Enter your name' onChange={(e) => {
                    setBName(e.target.value)
                  }}/>
                </div>
                <div className="form-group">
                  <label>Phone Number</label> <br />
                  <input type="text" className='cardcheckout' placeholder='Enter your number'onChange={(e) => {
                   setBPhone(e.target.value)
                  }} />
                </div>
                <button className="bookbtn">Book Now</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
