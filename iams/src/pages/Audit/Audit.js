// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const Audit = () => {
// //   const [audits, setAudits] = useState([]);
// //   const navigate = useNavigate();
// //   const fetchAudits = async () => {
// //     try {
// //       const response = await axios.get("http://localhost:9999/audits");
// //       setAudits(response.data);
// //     } catch (error) {
// //       console.error("Error fetching audits:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAudits();
// //   }, []);

// //   // const fetchAudits = async () => {
// //   //   try {
// //   //     const response = await axios.get("/api/audits");
// //   //     setAudits(response.data);
// //   //   } catch (error) {
// //   //     console.error("Error fetching audits:", error);
// //   //   }
// //   // };

// //   const handleCreateAudit = () => {
// //     navigate("/create-audit");
// //   };

// //   const handleViewDetail = (auditId) => {
// //     navigate(`/audit/${auditId}`);
// //   };

// //   return (
// //     <div className="container mx-auto p-5">
// //       <h2 className="text-2xl font-semibold mb-4">Audit List</h2>
// //       <button
// //         onClick={handleCreateAudit}
// //         className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
// //       >
// //         Create Audit
// //       </button>
// //       <table className="table-auto w-full text-left border border-gray-200 mt-3">
// //         <thead>
// //           <tr className="bg-gray-100">
// //             <th className="px-4 py-2 border">Date</th>
// //             <th className="px-4 py-2 border">Start Time</th>
// //             <th className="px-4 py-2 border">End Time</th>
// //             <th className="px-4 py-2 border">Participants</th>
// //             <th className="px-4 py-2 border">Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {audits.map((audit) => (
// //             <tr key={audit.id}>
// //               <td className="px-4 py-2 border">{audit.date}</td>
// //               <td className="px-4 py-2 border">{audit.startTime}</td>
// //               <td className="px-4 py-2 border">{audit.endTime}</td>
// //               <td className="px-4 py-2 border">
// //                 {audit.participants.join(", ")}
// //               </td>
// //               <td className="px-4 py-2 border">
// //                 <button
// //                   onClick={() => handleViewDetail(audit.id)}
// //                   className="text-blue-500 hover:text-blue-700"
// //                 >
// //                   View Detail
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default Audit;
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Audit = () => {
//   const [audits, setAudits] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAudits();
//   }, []);

//   const fetchAudits = async () => {
//     try {
//       const response = await axios.get("http://localhost:9999/audits");
//       setAudits(response.data);
//     } catch (error) {
//       console.error("Error fetching audits:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-5">
//       <h2 className="text-2xl font-semibold mb-4">Audit List</h2>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         onClick={() => navigate("/create-audit")}
//       >
//         Create Audit
//       </button>
//       <div className="mt-4">
//         {audits.length === 0 ? (
//           <p>No audits found.</p>
//         ) : (
//           <ul className="space-y-2">
//             {audits.map((audit) => (
//               <li key={audit.id} className="border p-3 rounded bg-gray-100">
//                 <p>
//                   <strong>Date:</strong> {audit.date}
//                 </p>
//                 <p>
//                   <strong>Start Time:</strong> {audit.startTime}
//                 </p>
//                 <p>
//                   <strong>End Time:</strong> {audit.endTime}
//                 </p>
//                 <p>
//                   <strong>Participants:</strong> {audit.participants.join(", ")}
//                 </p>
//                 <Link
//                   to={`/audit/${audit.id}`}
//                   className="text-blue-500 hover:underline"
//                 >
//                   View Detail
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Audit;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Audit = () => {
  const [audits, setAudits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async () => {
    try {
      const response = await axios.get("http://localhost:9999/audits");
      setAudits(response.data);
    } catch (error) {
      console.error("Error fetching audits:", error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-4">Audit List</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => navigate("/create-audit")}
      >
        Create Audit
      </button>
      <div className="mt-4">
        {audits.length === 0 ? (
          <p>No audits found.</p>
        ) : (
          <ul className="space-y-2">
            {audits.map((audit) => (
              <li key={audit.id} className="border p-3 rounded bg-gray-100">
                <p>
                  <strong>Date:</strong> {audit.date}
                </p>
                <p>
                  <strong>Start Time:</strong> {audit.startTime}
                </p>
                <p>
                  <strong>End Time:</strong> {audit.endTime}
                </p>
                <p>
                  <strong>Participants:</strong> {audit.participants.join(", ")}
                </p>
                <Link
                  to={`/audit/${audit.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Detail
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Audit;
