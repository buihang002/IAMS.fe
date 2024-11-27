// import React, { useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const AuditInternEvaluation = () => {
//   const { auditInternId } = useParams();
//   const [evaluation, setEvaluation] = useState([
//     { name: "DISCIPLINE", value: "", description: "" },
//     { name: "WORK", value: "", description: "" },
//     { name: "ACTIVITY_AND_ATTITUDE", value: "", description: "" },
//   ]);
//   const [message, setMessage] = useState("");

//   const handleChange = (index, field, value) => {
//     const updatedEvaluation = [...evaluation];
//     updatedEvaluation[index][field] = value;
//     setEvaluation(updatedEvaluation);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(
//         `http://localhost:8080/audit-form/audit-intern-form/${auditInternId}/evaluation`,
//         evaluation
//       );
//       setMessage("Evaluation submitted successfully!");
//       console.log("Response:", response.data);
//     } catch (error) {
//       console.error("Error submitting evaluation:", error);
//       setMessage("Error submitting evaluation.");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Audit Intern Evaluation</h1>
//       {message && (
//         <div
//           className={`mb-4 p-4 text-sm ${
//             message.includes("successfully")
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {message}
//         </div>
//       )}
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-6 bg-white p-6 rounded shadow"
//       >
//         {evaluation.map((criteria, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
//           >
//             <label className="font-semibold">{criteria.name}</label>
//             <input
//               type="number"
//               step="0.1"
//               max="10"
//               min="0"
//               value={criteria.value}
//               onChange={(e) => handleChange(index, "value", e.target.value)}
//               placeholder="Enter value (0-10)"
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//             <input
//               type="text"
//               value={criteria.description}
//               onChange={(e) =>
//                 handleChange(index, "description", e.target.value)
//               }
//               placeholder="Enter description"
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//           </div>
//         ))}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600"
//         >
//           Submit Evaluation
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AuditInternEvaluation;
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AuditInternEvaluation = () => {
  const { id } = useParams(); // Lấy auditId từ URL
  const [grades, setGrades] = useState([
    { name: "DISCIPLINE", value: "", description: "" },
    { name: "WORK", value: "", description: "" },
    { name: "ACTIVITY_AND_ATTITUDE", value: "", description: "" },
  ]);
  const [message, setMessage] = useState("");

  const handleChange = (index, field, value) => {
    const updatedGrades = [...grades];
    updatedGrades[index][field] = value;
    setGrades(updatedGrades);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/audit-form/audit-intern-form/${id}/evaluation`,
        grades
      );
      setMessage("Evaluation submitted successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting evaluation:", error);
      setMessage("Failed to submit evaluation.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Audit Intern Evaluation</h1>
      {message && (
        <div
          className={`mb-4 p-4 text-sm ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded shadow"
      >
        {grades.map((grade, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
          >
            <label className="font-semibold">{grade.name}</label>
            <input
              type="number"
              step="0.1"
              max="10"
              min="0"
              value={grade.value}
              onChange={(e) => handleChange(index, "value", e.target.value)}
              placeholder="Enter value (0-10)"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
            <input
              type="text"
              value={grade.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              placeholder="Enter description"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600"
        >
          Submit Evaluation
        </button>
      </form>
    </div>
  );
};

export default AuditInternEvaluation;
