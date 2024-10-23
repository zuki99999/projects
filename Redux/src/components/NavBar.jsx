import React from 'react'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const count = useSelector((state) => state.counter.value);

  return (
    <>

    <div> hello im nevbar:  {count}</div>
      
    </>
  )
}

export default NavBar
