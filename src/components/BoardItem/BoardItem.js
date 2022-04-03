import React, { useCallback, useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form } from 'react-bootstrap'

import Card from '../Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'

import './BoardItem.scss'
import { mapOrder } from '../../ultilities/sorts'
import {
  MODAL_ACTION_SAVE
} from 'ultilities/constants'
import {
  handleColumnTitleEnter,
  selectAllInlineText
} from 'ultilities/contentEditable'

function BoardItem(props) {
  const { column, onCardDrop, onUpdateColumn } = props
  const [isShowModalRemove, setShowModalRemove] = useState(false)

  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = useCallback(e => setColumnTitle(e.target.value), [])
  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])


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

  return (
    <div className='column'>
      <header className='column-drag-handle'>
        <div className='column-title'>
          <Form.Control
            size="sm"
            type="text"
            className='trello-content-editable'
            spellCheck="false" // disable spell check of chorme
            value={columnTitle}
            onClick={selectAllInlineText}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={e => handleColumnTitleEnter(e)}
            onMouseDown={e => e.preventDefault()}
          />
        </div>
        <div className='column-dropdown-actions'>
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              size="sm"
              className='dropdown-btn'
            />

            <Dropdown.Menu>
              <Dropdown.Item >Add card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowRemoveModal}>Remove column...</Dropdown.Item>
              <Dropdown.Item >Move all cards in this column</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className='card-list'>
        <Container
          groupName="col"
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {
            cards && cards.map((card, index) =>
              <Draggable key={index}>
                <Card card={card} />
              </Draggable>)
          }
        </Container>
      </div>
      <footer>
        <div className='footer-actions'>
          <i className='fa fa-plus icon'></i> Add another card
        </div>
      </footer>

      <ConfirmModal
        title={'Remove Column'}
        content={`Are you sure you want to remove <strong>${column.title}</strong>?
        <br>All related crads will alse be removed!</br>`}
        show={isShowModalRemove}
        onAction={modalAction}
      />
    </div>
  )
}

export default BoardItem
