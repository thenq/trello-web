import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'

import Card from '../Card/Card'
import './BoardItem.scss'
import { mapOrder } from '../../ultilities/sorts'

function BoardItem(props) {
  const { column } = props
  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const onCardDrop = (id, event) => {
    console.log(id, event);
  }
  return (
    <div className='column'>
      <header className='column-drag-handle'>{column.title}</header>
      <div className='card-list'>
        <Container
          groupName="col"
          // onDragStart={e => console.log('drag started', e)}
          // onDragEnd={e => console.log('drag end', e)}
          onDrop={e => onCardDrop(column.id, e)}
          getChildPayload={index => cards[index] }
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          // onDragEnter={() => {
          //   console.log('drag enter:', column.id)
          // }}
          // onDragLeave={() => {
          //   console.log('drag leave:', column.id)
          // }}
          // onDropReady={p => console.log('Drop ready: ', p)}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {
            cards.length && cards.map((card, index) =>
              <Draggable key={index}>
                <Card card={card} />
              </Draggable>)
          }
        </Container>
      </div>
      <footer>Add another cards</footer>
    </div>
  )
}

export default BoardItem
