import React from 'react'
import Card from '../Card/Card'
import './BoardItem.scss'
import { mapOrder } from '../../ultilities/sorts'

function BoardItem(props) {
  const { column } = props
  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  return (
    <div className='column'>
      <header>{ column.title }</header>
      <ul className='card-list'>
        {
          cards.length && cards.map((card, index) => <Card key={index} card={card}/>)
        }
      </ul>
      <footer>Add another cards</footer>
    </div>
  )
}

export default BoardItem
