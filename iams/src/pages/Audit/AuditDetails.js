// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import {
//   Card,
//   Button,
//   Container,
//   Spinner,
//   Alert,
//   Tab,
//   Nav,
//   Form,
// } from "react-bootstrap";

// const AuditDetail = () => {
//   const { id } = useParams();
//   const [audit, setAudit] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [evaluations, setEvaluations] = useState({});

//   useEffect(() => {
//     fetchAuditDetail();
//   }, []);

//   const fetchAuditDetail = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8080/audits/${id}`);
//       setAudit(response.data);

//       // Khởi tạo đánh giá trống cho mỗi participant
//       const initialEvaluations = {};
//       response.data.participants.forEach((participant) => {
//         initialEvaluations[participant] = {
//           discipline: "",
//           work: "",
//           attitude: "",
//           comment: "",
//         };
//       });
//       setEvaluations(initialEvaluations);

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching audit detail:", error);
//       setError("Could not fetch audit details. Please try again.");
//       setLoading(false);
//     }
//   };

//   const handleEvaluationChange = (participant, field, value) => {
//     setEvaluations((prev) => ({
//       ...prev,
//       [participant]: {
//         ...prev[participant],
//         [field]: value,
//       },
//     }));
//   };

//   const handleSaveEvaluation = (participant) => {
//     const evaluationData = evaluations[participant];
//     console.log(`Saving evaluation for ${participant}:`, evaluationData);

//     // Tạo API POST lưu đánh giá cho từng participant (tùy chỉnh endpoint)
//     axios
//       .post(`http://localhost:8080/audits/${id}/evaluate`, {
//         participant,
//         ...evaluationData,
//       })
//       .then((response) => {
//         alert(`Evaluation saved for ${participant}`);
//       })
//       .catch((error) => {
//         console.error("Error saving evaluation:", error);
//         alert("Error saving evaluation. Please try again.");
//       });
//   };

//   if (loading) {
//     return (
//       <Container
//         className="d-flex justify-content-center align-items-center"
//         style={{ minHeight: "100vh" }}
//       >
//         <Spinner animation="border" variant="primary" />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//         <Link to="/audit" className="btn btn-primary mt-3">
//           Back to Audits
//         </Link>
//       </Container>
//     );
//   }

//   return (
//     <Container className="my-5">
//       <div className="">
//         <Card.Body>
//           {audit ? (
//             <>
//               <Card.Text className="text-xl font-bold">{audit.date}</Card.Text>
//               <div className="grid grid-cols-2 gap-4">
//                 <Card.Text>
//                   <strong>Start Time:</strong>{" "}
//                   <div className="rounded-xl border shadow-sm p-3 mt-2">
//                     {audit.startTime}
//                   </div>
//                 </Card.Text>
//                 <Card.Text>
//                   <strong>End Time:</strong>
//                   <div className="rounded-xl border shadow-sm p-3 mt-2">
//                     {audit.endTime}
//                   </div>
//                 </Card.Text>
//               </div>

//               <h5 className="mt-4">Participants</h5>
//               <Tab.Container
//                 id="participant-tabs"
//                 defaultActiveKey={audit.participants[0]}
//               >
//                 <Nav variant="tabs" className="mb-3 mt-3  ">
//                   {audit.participants.map((participant) => (
//                     <Nav.Item key={participant}>
//                       <Nav.Link eventKey={participant}>{participant}</Nav.Link>
//                     </Nav.Item>
//                   ))}
//                 </Nav>
//                 <Tab.Content>
//                   {audit.participants.map((participant) => (
//                     <Tab.Pane key={participant} eventKey={participant}>
//                       <Form>
//                         <div className="grid grid-cols-3 gap-4">
//                           {" "}
//                           <Form.Group className="mb-3">
//                             <Form.Label className="font-semibold text-zinc-700">
//                               Discipline (1-10)
//                             </Form.Label>
//                             <Form.Control
//                               type="number"
//                               min="1"
//                               max="10"
//                               value={evaluations[participant]?.discipline || ""}
//                               onChange={(e) =>
//                                 handleEvaluationChange(
//                                   participant,
//                                   "discipline",
//                                   e.target.value
//                                 )
//                               }
//                             />
//                           </Form.Group>
//                           <Form.Group className="mb-3">
//                             <Form.Label className="font-semibold text-zinc-700">
//                               Work (1-10)
//                             </Form.Label>
//                             <Form.Control
//                               type="number"
//                               min="1"
//                               max="10"
//                               value={evaluations[participant]?.work || ""}
//                               onChange={(e) =>
//                                 handleEvaluationChange(
//                                   participant,
//                                   "work",
//                                   e.target.value
//                                 )
//                               }
//                             />
//                           </Form.Group>
//                           <Form.Group className="mb-3">
//                             <Form.Label className="font-semibold text-zinc-700">
//                               Activity & Attitude (1-10)
//                             </Form.Label>
//                             <Form.Control
//                               type="number"
//                               min="1"
//                               max="10"
//                               value={evaluations[participant]?.attitude || ""}
//                               onChange={(e) =>
//                                 handleEvaluationChange(
//                                   participant,
//                                   "attitude",
//                                   e.target.value
//                                 )
//                               }
//                             />
//                           </Form.Group>
//                         </div>

//                         <Form.Group className="mb-3">
//                           <Form.Label className="font-semibold text-zinc-700">
//                             Audit Comment
//                           </Form.Label>
//                           <Form.Control
//                             as="textarea"
//                             rows={3}
//                             value={evaluations[participant]?.comment || ""}
//                             onChange={(e) =>
//                               handleEvaluationChange(
//                                 participant,
//                                 "comment",
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </Form.Group>
//                         <Button
//                           variant="primary"
//                           onClick={() => handleSaveEvaluation(participant)}
//                         >
//                           Save Evaluation
//                         </Button>
//                       </Form>
//                     </Tab.Pane>
//                   ))}
//                 </Tab.Content>
//               </Tab.Container>
//             </>
//           ) : (
//             <Alert variant="info">No audit data available.</Alert>
//           )}
//         </Card.Body>
//       </div>
//     </Container>
//   );
// };

// export default AuditDetail;
