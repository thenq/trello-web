import React from 'react'

import './Card.scss'

function Task({ card }) {
  return (
    <div className='card-item column-drag-handle-card'>
      {
        card.cover &&
        <img
          src={card.cover}
          alt="Title"
          className='card-cover'
          onMouseDown={e => e.preventDefault()}
        />
      }
      Title: {card.title}
    </div>
  )
}

export default Task