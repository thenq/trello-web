import React from 'react'
import { mapOrder } from '../../ultilities/sorts'

import './Card.scss'

function Task({ card }) {
  return (
    <li className='card-item'>
      {card.cover && <img src={card.cover} alt="Title" />}
      Title: {card.title}
    </li>
  )
}

export default Task