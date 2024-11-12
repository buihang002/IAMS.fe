import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const Audit = () => {
  const [audits, setAudits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState("");

  const defaultParticipants = ["Minh", "Joyce", "Lyly"];

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async () => {
    try {
      const response = await axios.get("data/db.json");
      setAudits(response.data.audits);
    } catch (error) {
      console.error("Error fetching audits:", error);
    }
  };

  const handleSaveAudit = async () => {
    if (!date || !startTime || !endTime || participants.length === 0) {
      setError("Please fill in all fields.");
      return;
    }

    const newAudit = {
      id: uuidv4(),
      date,
      startTime,
      endTime,
      participants,
    };

    try {
      await axios.post("data/db.json", newAudit); // Adjust as needed for your backend or local setup.
      setAudits([...audits, newAudit]);
      handleCloseModal();
    } catch (error) {
      console.error("Error creating audit:", error);
      setError("There was an error saving the audit. Please try again.");
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setError("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDate("");
    setStartTime("");
    setEndTime("");
    setParticipants([]);
  };

  const toggleParticipant = (name) => {
    setParticipants((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  return (
    <div className="container mx-auto p-5 mt-11">
      <h2 className="text-2xl font-semibold mb-4">Audit List</h2>
      <Button variant="primary" onClick={handleOpenModal}>
        Create Audit
      </Button>

      <div className="mt-4">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-950 text-white uppercase text-sm leading-normal">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
              <th className="px-4 py-2">Participants</th>
              <th className="px-4 py-2">View Details</th>
            </tr>
          </thead>
          <tbody>
            {audits.map((audit) => (
              <tr key={audit.id}>
                <td className="border px-4 py-2">{audit.id}</td>
                <td className="border px-4 py-2">{audit.date}</td>
                <td className="border px-4 py-2">{audit.startTime}</td>
                <td className="border px-4 py-2">{audit.endTime}</td>
                <td className="border px-4 py-2">
                  {audit.participants.join(", ")}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/audit/${audit.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Audit Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Audit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Participants</Form.Label>
              {defaultParticipants.map((name) => (
                <Form.Check
                  key={name}
                  type="checkbox"
                  label={name}
                  checked={participants.includes(name)}
                  onChange={() => toggleParticipant(name)}
                />
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveAudit}>
            Save Audit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Audit;
