import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Areyousure({open,setopen,handleaction,closetitle,oktitle,bodytext,headingtext}) {

  const handleClose = () => setopen(false);
 
  return (
    <>
     

      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{headingtext}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodytext}</Modal.Body>
        <Modal.Footer>
          <Button color='danger' variant="secondary" onClick={handleClose}>
            {closetitle}
          </Button>
          <Button variant="primary" onClick={handleaction}>
            {oktitle}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

