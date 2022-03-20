import React, { useState, useEffect } from 'react'
import BoardItem from '../BoardItem/BoardItem'
import './BoardContent.scss'
import { isEmpty } from 'lodash'
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

  return (
    <div className='board-content'>
      {
        columns.map((column, index) => <BoardItem column={column} key={index}/>)
      }
    </div>
  )
}

export default BoardContent
