import React from 'react'
import '../Css/Home.css'
import House from '../assets/house.png'
import '../Css/Home_mobile.css'


function Home(props) {
  return (
    <div className='fixed' id='home'>
    
    <div className='home'>

        <div className='scout'>
        <h1 className='org1'>{props.first}</h1>
        <h1 className='stroke'>{props.first}</h1>
        </div>
        <div className="for">
            <h1 className='org2'>{props.second}</h1>
            <h1 className='stroke'>{props.second}</h1>
        </div>
        <div className="comfort">
            <h1 className='org3'>{props.third}</h1>
            <h1 className='stroke'>{props.third}.</h1>
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
