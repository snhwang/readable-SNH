import React from "react";
import { Link } from 'react-router-dom'

export const HomeButton = () => {
  return (
      <Link to='/'>
        <button> Home </button>
      </Link>
  )
}

export default HomeButton