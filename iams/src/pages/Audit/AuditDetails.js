import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";

const AuditDetail = ({ audits }) => {
  const { auditId } = useParams();
  const audit = audits.find((a) => a.id === parseInt(auditId));
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);

  const handleShow = (participant) => {
    setSelectedParticipant(participant);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSaveComment = () => {
    console.log(`Comment for ${selectedParticipant}: ${comment}`);
    handleClose();
  };

  return (
    <div className="container mt-5">
      <h2>Audit Detail</h2>
      {audit ? (
        <>
          <p>Date: {audit.date}</p>
          <p>Start Time: {audit.startTime}</p>
          <p>End Time: {audit.endTime}</p>
          <h4>Participants</h4>
          <ul>
            {audit.participants.map((participant) => (
              <li key={participant}>
                {participant}
                <Button variant="link" onClick={() => handleShow(participant)}>
                  Comment
                </Button>
              </li>
            ))}
          </ul>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Comment for {selectedParticipant}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formComment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveComment}>
                Save Comment
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p>Audit not found</p>
      )}
    </div>
  );
};

export default AuditDetail;
