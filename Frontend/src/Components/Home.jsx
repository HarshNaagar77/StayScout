import React from 'react'
import '../Css/Home.css'
import House from '../assets/house.png'
import '../Css/Home_mobile.css'


function Home() {
  return (
    <div className='fixed' id='home'>
    
    <div className='home'>

        <div className='scout'>
        <h1 className='org1'>Scout</h1>
        <h1 className='stroke'>Scout</h1>
        </div>
        <div className="for">
            <h1 className='org2'>For</h1>
            <h1 className='stroke'>For</h1>
        </div>
        <div className="comfort">
            <h1 className='org3'>Comfort</h1>
            <h1 className='stroke'>Comfort.</h1>
        </div>
          <img className='houseimg' src={House} alt="" />
    </div>
    <div className="home-bottom">
      <p className="tagline1">Find <span className='bold'>Your<br /> Home</span> Away.</p>
      <div className='arrow-text'>
      Scroll  
      <button className='btn'><i className="bi bi-arrow-down"></i></button>
      Down
      </div>
      <p className="tagline1">Discover <span className='bold'>Your <br /> Next</span> Adventure</p>
    </div>
    </div>
  )
}

export default Home
