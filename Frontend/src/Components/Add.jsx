import React, { useState } from 'react'
import '../Css/Add.css'
import Navbar from './Navbar'
import axios from 'axios'

export default function Add() {
  const [title , setTitle] = useState("")
  const [description , setDescription] = useState("")
  const [location , setLocation] = useState("")

  const placeAdder = (e) => {
    e.preventDefault()
    axios.post('/addplace' ,{
      title,
      description,
      location
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    setTitle('')
    setDescription('')
    setLocation('')
  }

  return (
    <div className='add'>
      <Navbar text='Feed' text2 = "Add" hideStartButton = {true}></Navbar>
      
      <div className='add__container'>
        <h2>Add a new post</h2>
        <form action="" onSubmit={placeAdder}>
          title <input type="text" value = {title} onChange={(e) => setTitle(e.target.value)} />
          description <input type="text" value = {description} onChange={(e) => setDescription(e.target.value)}  />
          location <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}  />
          <button className="submit" type='submit'>submit</button>
        </form>
      </div>
    </div>
  )
}
