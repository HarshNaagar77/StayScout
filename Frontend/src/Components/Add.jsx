import React from 'react'
import '../Css/Add.css'
import Navbar from './Navbar'

export default function Add() {
  return (
    <div className='add'>
      <Navbar text='Feed' text2 = "Add" hideStartButton = {true}></Navbar>
    </div>
  )
}
