import React from "react";
import { Link } from 'react-router-dom'


export const Navigation = (history) => {
  return (
    <div>
      Navigation: 
      <Link to='/'>
        <button type="button">
          Home
        </button>
      </Link>
        <button type="button" onClick={history.goBack}>
          Back
        </button>
    </div>
  )
}

export default Navigation