// import React, { useEffect, useState } from "react";
// import axios from "../../../utils/MyAxios";
// import { Link, Navigate } from "react-router-dom";
// const AuditList = () => {
//   const [audits, setAudits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAudits = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const userStr = localStorage.getItem("user");
//         const user = JSON.parse(userStr);
//         const mentorId = user?.userId;

//         if (!mentorId) {
//           setError("No audit ID found in localStorage.");
//           return;
//         }

//         const response = await axios.get(`/audit/get-by-mentor/${mentorId}`);

//         if (response && response.data) {
//           setAudits(response.data);
//           // setFilteredInterns(response.data); // Initialize with all interns
//         } else {
//           setError("No interns found for this mentor.");
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError(
//           err.response?.data?.message ||
//             "Failed to fetch interns. Please try again."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAudits();
//   }, []);
//   const handleViewDetails = (id) => {
//     Navigate(`/audit/${id}`);
//   };

//   return (
//     <div className="container mx-auto p-4 ">
//       <h1 className="text-2xl font-bold mb-4">Audit List</h1>
//       <button className="px-4 py-2 bg-blue-500 mb-6 mt-4 text-white rounded-md hover:bg-blue-600">
//         <Link to="/create-audit"> Create Audit</Link>
//       </button>
//       <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//         <thead>
//           <tr className="bg-gray-800 text-white ">
//             <th className="px-4 py-2">#</th>
//             {/* <th className="px-4 py-2 text-left">Audit ID</th> */}
//             <th className="px-4 py-2 text-left">Date</th>
//             <th className="px-4 py-2 text-left">Evaluation Period</th>

//             <th className="px-4 py-2 text-left">auditInterns</th>
//             <th className="px-4 py-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {audits.map((audit, index) => (
//             <tr
//               key={audit.auditId}
//               className="border-t hover:bg-gradient-to-r hover:bg-gray-50 border shadow-sm hover:scale-105 transition-transform transform duration-300"
//             >
//               <td className="px-4 py-2 text-center">{index + 1}</td>
//               {/* <td className="px-4 py-2">{audit.auditId}</td> */}{" "}
//               <td className="px-4 py-2">{audit.date}</td>
//               <td className="px-4 py-2">{audit.evaluationPeriod}</td>
//               {/* interns */}
//               {/* <td className="px-4 py-2">
//                 {audit.interns.length > 0 ? (
//                   <ul>
//                     {audit.interns.map((intern, idx) => (
//                       <li key={idx}>{intern.fullName || "Unknown"}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <span>No interns</span>
//                 )}
//               </td> */}
//               {/* auditInterns */}
//               <td className="px-4 py-2">
//                 {audit.auditInterns.length > 0 ? (
//                   <ul>
//                     {audit.auditInterns.map((auditIntern, idx) => (
//                       <li key={idx}>{auditIntern.internId || "Unknown"}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <span>No audit interns</span>
//                 )}
//               </td>
//               <td className="px-4 py-2">
//                 {/* <Link to={`/audit/${audit.auditId}`}> */}
//                 <button
//                   onClick={() => handleViewDetails(audit.id)}
//                   className="px-3 py-1 text-gray-600 text-sm rounded-lg hover:bg-gray-200 hover:shadow"
//                 >
//                   <i className="bi bi-eye-fill" />
//                 </button>
//                 {/* </Link> */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AuditList;
import React, { useEffect, useState } from "react";
import axios from "../../../utils/MyAxios";
import { Link, useNavigate } from "react-router-dom";

const AuditList = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async (month = "", year = "") => {
    setLoading(true);
    setError(null);
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) throw new Error("User not logged in.");

      const user = JSON.parse(userStr);
      const mentorId = user?.userId;

      if (!mentorId) throw new Error("No mentor ID found in localStorage.");

      const endpoint =
        month && year
          ? `/audit/get-by-month?month=${month}&year=${year}`
          : `/audit/get-by-mentor/${mentorId}`;

      const response = await axios.get(endpoint);

      if (response?.data) {
        setAudits(response.data);
      } else {
        setError("No audits found for this mentor.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || "Failed to fetch audits.");
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    if (month) {
      fetchAudits(month, selectedYear);
    } else {
      fetchAudits();
    }
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    if (selectedMonth) {
      fetchAudits(selectedMonth, year);
    }
  };

  const handleViewDetails = (auditId) => {
    navigate(`/audit/${auditId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Audit List</h1>
      <div className="flex items-center gap-4 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <Link to="/create-audit">Create Audit</Link>
        </button>

        {/* Chọn tháng */}
        <div className="flex items-center gap-2">
          <label htmlFor="month-select" className="text-gray-700 font-medium">
            Month:
          </label>
          <select
            id="month-select"
            className="border border-gray-300 rounded-md px-3 py-2"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="">All Months</option>
            {[...Array(12).keys()].map((month) => (
              <option key={month + 1} value={month + 1}>
                {new Date(0, month).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </div>

        {/* Chọn năm */}
        <div className="flex items-center gap-2">
          <label htmlFor="year-select" className="text-gray-700 font-medium">
            Year:
          </label>
          <input
            id="year-select"
            type="number"
            className="border border-gray-300 rounded-md px-3 py-2 w-24"
            value={selectedYear}
            onChange={handleYearChange}
            min="2000"
            max="2100"
          />
        </div>
      </div>

      {loading ? (
        <p>Loading audits...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : audits.length === 0 ? (
        <p>No audits available.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Evaluation Period</th>
              <th className="px-4 py-2 text-left">Audit Interns</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {audits.map((audit, index) => (
              <tr
                key={audit.auditId}
                className="border-t hover:bg-gray-50 border shadow-sm hover:scale-105 transition-transform duration-300"
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2">{audit.date || "N/A"}</td>
                <td className="px-4 py-2">{audit.evaluationPeriod || "N/A"}</td>
                <td className="px-4 py-2">
                  {audit.auditInterns?.length > 0 ? (
                    <ul>
                      {audit.auditInterns.map((auditIntern, idx) => (
                        <li key={idx}>{auditIntern.internId || "Unknown"}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>No audit interns</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleViewDetails(audit.auditId)}
                    className="px-3 py-1 text-gray-600 text-sm rounded-lg hover:bg-gray-200 hover:shadow"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AuditList;
