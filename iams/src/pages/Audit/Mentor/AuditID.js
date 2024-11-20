// import React, { useEffect, useState } from "react";
// import axios from "../../../utils/MyAxios";
// import { Link, Outlet } from "react-router-dom";
// const AuditList = () => {
//   const [audits, setAudits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Gọi API để lấy danh sách Audit
//     axios
//       .get("/audit/get-by-month?month=11&year=2024") // Thay bằng API phù hợp
//       .then((response) => {
//         setAudits(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//   return (
//     <div className="p-6 mt-20">
//       <nav>
//         <Link to="/intern">Intern</Link>
//         <Link to="/audit">Audit</Link>
//       </nav>
//       <Outlet />
//       <Link to="/create-audit">Create New Audit</Link>
//       <h1 className="text-2xl font-bold text-center mb-6">Audit List</h1>
//       <table className="table-auto w-full border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 px-4 py-2">ID</th>
//             <th className="border border-gray-300 px-4 py-2">Title</th>
//             <th className="border border-gray-300 px-4 py-2">Created By</th>
//             <th className="border border-gray-300 px-4 py-2">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {audits.map((audit) => (
//             <tr key={audit.id} className="hover:bg-gray-50">
//               <td className="border border-gray-300 px-4 py-2">
//                 {audit.audit_d}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {audit.evaluationPeriod}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {audit.createdBy}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">{audit.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AuditList;
import React from "react";

function AuditID() {
  return <div className="mt-17">AuditID</div>;
}

export default AuditID;
