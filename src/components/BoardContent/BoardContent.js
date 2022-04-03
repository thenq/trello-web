import React, { useState, useEffect, useRef, useCallback } from 'react'
import { isEmpty } from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'

import BoardItem from '../BoardItem/BoardItem'
import './BoardContent.scss'
import { mapOrder } from '../../ultilities/sorts'
import { applyDrag } from '../../ultilities/dragDrop'
import {
  Container as BSContainer,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap'

import { initialData } from '../../actions/initialData'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [isOpenAddNew, setOpenAddNew] = useState(false)
  const addNewColumnInputRef = useRef(null)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = useCallback((e) => setNewColumnTitle(e.target.value), [])

  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)

      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])

  useEffect(() => {
    if (addNewColumnInputRef && addNewColumnInputRef.current) {
      addNewColumnInputRef.current.focus()
      addNewColumnInputRef.current.select()
    }
  }, [isOpenAddNew])


  if (isEmpty(board)) {
    return <div className='board-not-found'>Board Not Found!</div>
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = { ...board }
    newBoard.columnOrder = columns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
      let newColumns = [...columns]
      let currentColumn = newColumns.find(column => column.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(card => card.id)

      setColumns(newColumns)
    }
  }

  const toggleAddNewColumn = () => setOpenAddNew(!isOpenAddNew)

  const addNewColumn = () => {
    if (!newColumnTitle) {
      return addNewColumnInputRef.current.focus()
    }

    const newColumnToAdd = {
      id: Math.random().toString(36).substring(2, 5), // Random charactors
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: []
    }

    const newColumns = [...columns]
    newColumns.push(newColumnToAdd)
    setColumns(newColumns)

    const newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns
    setBoard(newBoard)

    setNewColumnTitle('')
    setOpenAddNew(false)
  }

  const onUpdateColumn = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate.id
    let newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex(c => c.id === columnIdToUpdate)

    if (newColumnToUpdate._destroy) {
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
    }

    let newBoard = { ...board }
    newBoard.columnOrder = columns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

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
              <BoardItem
                column={column}
                onCardDrop={onCardDrop}
                onUpdateColumn={onUpdateColumn}
              />
            </Draggable>
          )
        }
      </Container>
      <BSContainer style={{ margin: '0 10px', padding: 0 }}>
        {!isOpenAddNew &&
          <Row>
            <Col className='add-new-column' onClick={toggleAddNewColumn}>
              <i className='fa fa-plus icon'></i> Add another column
            </Col>
          </Row>}
        {isOpenAddNew &&
          <Row>
            <Col className='create-new-column'>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter column title..."
                className='input-create-new-column'
                ref={addNewColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={e => (e.key === 'Enter') && addNewColumn()}
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>Add list</Button>
              <span className='cancel-create-new' onClick={toggleAddNewColumn}>
                <i className='fa fa-trash icon'></i>
              </span>
            </Col>
          </Row>}
      </BSContainer>
    </div>
  )
}

export default BoardContent
