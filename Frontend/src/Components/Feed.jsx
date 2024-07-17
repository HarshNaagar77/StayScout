import React from 'react'
import '../Css/Feed.css'
import axios from 'axios'
import Navbar from './Navbar'

export default function Feed() {
  const logout = () => {
    axios.post('http://localhost:3000/logout')
    localStorage.removeItem('token')
  }
  return (
    <div className='feed'>
      <Navbar text = 'Feed' text2 = 'Add' hideStartButton = {true}></Navbar>
      <div className="logout">
      <button onClick={logout} className=''>Logout</button>
      </div>
    </div>
  )
}
