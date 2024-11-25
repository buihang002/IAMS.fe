import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AuditFilter = ({ onFilter }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [mentorId, setMentorId] = useState("");

  const handleFilter = () => {
    onFilter({ month, year, mentorId });
  };

  return (
    <Form>
      <Form.Group controlId="month" className="mb-3">
        <Form.Label>Month</Form.Label>
        <Form.Control
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="year" className="mb-3">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="mentorId" className="mb-3">
        <Form.Label>Mentor ID</Form.Label>
        <Form.Control
          type="text"
          value={mentorId}
          onChange={(e) => setMentorId(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleFilter}>
        Apply Filter
      </Button>
    </Form>
  );
};

export default AuditFilter;
