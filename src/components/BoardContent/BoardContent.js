import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'

import BoardItem from '../BoardItem/BoardItem'
import './BoardContent.scss'
import { mapOrder } from '../../ultilities/sorts'

import { initialData } from '../../actions/initialData'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)

      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])

  if (isEmpty(board)) {
    return <div className='board-not-found'>Board Not Found!</div>
  }


  const onColumnDrop = (dropResult) => {
    console.log(dropResult);
  }

  // const onCardDrop = (columnId, dropResult) => {

  // }

  return (
    <div className='board-content'>
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={index => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {
          columns.map((column, index) =>
            <Draggable key={index}>
              <BoardItem column={column} key={index} />
            </Draggable>
          )
        }
      </Container>
    </div>
  )
}

export default BoardContent
