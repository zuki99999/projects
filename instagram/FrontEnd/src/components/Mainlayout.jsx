import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSideBar from './LeftSideBar'

function Mainlayout() {
  return (
    
    <>
        <LeftSideBar/>
        <div><Outlet/></div>
      
    </>
  )
}

export default Mainlayout
