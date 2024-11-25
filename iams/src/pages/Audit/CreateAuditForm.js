import React, { useState } from "react";
import axios from "axios";

const CreateAuditForm = () => {
  const [date, setDate] = useState("");
  const [evaluationPeriod, setEvaluationPeriod] = useState("WEEKLY");
  const [interns, setInterns] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { date, evaluationPeriod, interns: interns.split(",") };

    axios
      .post("http://localhost:8080/audit/create-new-form", data)
      .then(() => {
        alert("Audit created successfully!");
      })
      .catch((error) => console.error("Error creating audit:", error));
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Create New Audit</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Evaluation Period</label>
          <select
            value={evaluationPeriod}
            onChange={(e) => setEvaluationPeriod(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
          >
            <option value="0">Weekly</option>
            <option value="1">Fortnight</option>
            <option value="3">Monthly</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">
            Interns (Comma-separated IDs)
          </label>
          <input
            type="text"
            placeholder="Enter intern IDs"
            value={interns}
            onChange={(e) => setInterns(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateAuditForm;
// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// const AuditForm = ({ onSubmit, onClose }) => {
//   const [mentorId, setMentorId] = useState("");
//   const [evaluationPeriod, setEvaluationPeriod] = useState(0);
//   const [interns, setInterns] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       mentorId,
//       evaluationPeriod: parseInt(evaluationPeriod),
//       interns: interns.split(",").map((id) => id.trim()),
//     };
//     onSubmit(formData);
//   };

//   return (
//     <Modal show onHide={onClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Create New Audit</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="mentorId" className="mb-3">
//             <Form.Label>Mentor ID</Form.Label>
//             <Form.Control
//               type="text"
//               value={mentorId}
//               onChange={(e) => setMentorId(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="evaluationPeriod" className="mb-3">
//             <Form.Label>Evaluation Period</Form.Label>
//             <Form.Select
//               value={evaluationPeriod}
//               onChange={(e) => setEvaluationPeriod(e.target.value)}
//             >
//               <option value="0">WEEKLY</option>
//               <option value="1">FORTNIGHT</option>
//               <option value="2">MONTHLY</option>
//             </Form.Select>
//           </Form.Group>
//           <Form.Group controlId="interns" className="mb-3">
//             <Form.Label>Intern IDs (comma separated)</Form.Label>
//             <Form.Control
//               type="text"
//               value={interns}
//               onChange={(e) => setInterns(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Submit
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AuditForm;
