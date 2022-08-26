import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import "../main.css"

import EditModalTitle from './EditModalTitle';
import EditModalBody from './EditModalBody';

export default function EditProfile ({show, handleClose}) {


    return (
        <Modal show={show} onHide={handleClose} contentClassName="custom-modal-style">
            <Modal.Header closeButton>
                <Modal.Title>Edit profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditModalTitle />
                <EditModalBody />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
                Save 
            </Button>
            </Modal.Footer>
        </Modal>
    );
}