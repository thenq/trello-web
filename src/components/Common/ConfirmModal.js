import { Button, Modal } from 'react-bootstrap'
import parse from 'html-react-parser'

import {
  MODAL_ACTION_CLOSE,
  MODAL_ACTION_SAVE
} from 'utilities/constants'

export default function ConfirmModal(props) {
  const { title, content, show, onAction } = props
  return (
    <Modal
      show={show}
      onHide={() => onAction(MODAL_ACTION_CLOSE)}
      backdrop="static"
      keyboard={true}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{parse(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{parse(content)}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
          No
        </Button>
        <Button variant="primary" onClick={() => onAction(MODAL_ACTION_SAVE)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
