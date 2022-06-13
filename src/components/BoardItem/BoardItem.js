import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Button, Dropdown, Form } from 'react-bootstrap'

import Card from '../Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'

import './BoardItem.scss'
import { mapOrder } from '../../utilities/sorts'
import { MODAL_ACTION_SAVE } from 'utilities/constants'
import { handleColumnTitleEnter, selectAllInlineText } from 'utilities/contentEditable'
import { cloneDeep } from 'lodash'

function BoardItem(props) {
  const { column, onCardDrop, onUpdateColumn } = props
  const [isShowModalRemove, setShowModalRemove] = useState(false)
  const [isOpenAddNewCard, setOpenAddNewCard] = useState(false)
  const addNewCardInputRef = useRef(null)
  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = useCallback((e) => setNewCardTitle(e.target.value), [])

  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = useCallback((e) => setColumnTitle(e.target.value), [])

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  useEffect(() => {
    if (addNewCardInputRef && addNewCardInputRef.current) {
      addNewCardInputRef.current.focus()
      addNewCardInputRef.current.select()
    }
  }, [isOpenAddNewCard])

  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const modalAction = (action) => {
    if (action === MODAL_ACTION_SAVE) {
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleShowRemoveModal()
  }

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
  }

  const toggleShowRemoveModal = () => setShowModalRemove(!isShowModalRemove)

  const toggleAddNewCard = () => setOpenAddNewCard(!isOpenAddNewCard)
  const addNewCard = () => {
    if (!newCardTitle) {
      return addNewCardInputRef.current.focus()
    }

    const newCardToAdd = {
      id: Math.random().toString(36).substring(2, 5), // Random characters
      boardId: column.boardId,
      columnId: column.id,
      title: newCardTitle.trim(),
      cover: null
    }

    const newColumn = cloneDeep(column)
    newColumn.cards.push(newCardToAdd)
    newColumn.cardOrder.push(newCardToAdd.id)

    onUpdateColumn(newColumn)

    setNewCardTitle('')
    setOpenAddNewCard(false)
  }

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            className="trello-content-editable"
            spellCheck="false" // disable spell check of chrome
            value={columnTitle}
            onClick={selectAllInlineText}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={(e) => handleColumnTitleEnter(e)}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setOpenAddNewCard(!isOpenAddNewCard)}>Add card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowRemoveModal}>Remove column...</Dropdown.Item>
              <Dropdown.Item>Move all cards in this column</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          groupName="col"
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards &&
            cards.map((card, index) => (
              <Draggable key={index}>
                <Card card={card} />
              </Draggable>
            ))}
        </Container>

        {isOpenAddNewCard && (
          <div className="create-new-card-input">
            <Form.Control
              size="sm"
              as="textarea"
              rows="3"
              placeholder="Enter card title..."
              className="input-create-new-card"
              ref={addNewCardInputRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={(e) => e.key === 'Enter' && addNewCard()}
            />
          </div>
        )}
      </div>
      <footer>
        {isOpenAddNewCard && (
          <div className="create-new-card-actions">
            <Button variant="success" size="sm" onClick={addNewCard}>
              Add card
            </Button>
            <span className="delete-icon" onClick={toggleAddNewCard}>
              <i className="fa fa-trash icon"></i>
            </span>
          </div>
        )}
        {!isOpenAddNewCard && (
          <div className="footer-actions" onClick={toggleAddNewCard}>
            <i className="fa fa-plus icon"></i> Add another card
          </div>
        )}
      </footer>

      <ConfirmModal
        title={'Remove Column'}
        content={`Are you sure you want to remove <strong>${column.title}</strong>?
        <br>All related cards will also be removed!</br>`}
        show={isShowModalRemove}
        onAction={modalAction}
      />
    </div>
  )
}

export default BoardItem
