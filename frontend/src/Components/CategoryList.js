import React from 'react'
import {Link} from 'react-router-dom'


export const CategoryList = ({categories}) => (
  categories
  ?
  <div>
    <ul className='category-list'>
      {categories.map((category) => (
        <li key={category} >
          {(<Link to={`/${category}`} >{category}</Link>)}
        </li>
      ))}
    </ul>
  </div>
  : ""
)
