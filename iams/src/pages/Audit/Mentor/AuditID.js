import React, { useEffect, useState } from "react";
import axios from "../../../utils/MyAxios";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
const AuditList = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/audit/get-all")
      .then((response) => {
        setAudits(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the audits:", error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Audit List</h1>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        <Link to="/create-audit"> Create Audit</Link>
      </button>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Audit ID</th>
            <th className="px-4 py-2 text-left">Mentor ID</th>
            <th className="px-4 py-2 text-left">Evaluation Period</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {audits.map((audit) => (
            <tr key={audit.auditId} className="border-b">
              <td className="px-4 py-2">{audit.auditId}</td>
              <td className="px-4 py-2">{audit.mentorId}</td>
              <td className="px-4 py-2">{audit.evaluationPeriod}</td>
              <td className="px-4 py-2">{audit.date}</td>
              <td className="px-4 py-2">
                <Link to={`/audit/${audit.auditId}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditList;
