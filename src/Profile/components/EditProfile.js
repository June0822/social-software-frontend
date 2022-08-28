import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../main.css"

import EditModalTitle from './EditModalTitle';
import EditModalBody from './EditModalBody';
import { useState } from 'react';

export default function EditProfile (props) {

    const {user, show, handleClose, handleSave, tempName, setTempName, tempBio, setTempBio, tempCover, setTempCover, tempProfile, setTempProfile} = props

    const TitlePropsObj = {
        user: user,
        tempCover: tempCover,
        setTempCover: setTempCover,
        tempProfile: tempProfile,
        setTempProfile: setTempProfile
    }

    const BodyPropsObj = {
        tempName: tempName,
        setTempName: setTempName,
        tempBio: tempBio,
        setTempBio: setTempBio
    }

    return (
        <Modal show={show} onHide={handleClose} contentClassName="custom-modal-style">
            <Modal.Header closeButton>
                <Modal.Title>Edit profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditModalTitle {...TitlePropsObj}/>
                <EditModalBody {...BodyPropsObj}/>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="success" onClick={(event)=>handleSave(event, tempName, tempBio)}>
                Save 
            </Button>
            </Modal.Footer>
        </Modal>
    );
}