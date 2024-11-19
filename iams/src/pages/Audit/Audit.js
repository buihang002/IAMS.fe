import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const AuditList = () => {
  const [audits, setAudits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/audit/get-by-month?month=10&year=2024")
      .then((response) => {
        setAudits(response.data);
      })
      .catch((error) => console.error("Error fetching audits:", error));
  }, []);

  return (
    <div className="container mx-auto p-6 mt-11">
      <h1 className="text-2xl font-bold mb-4">Audit Management</h1>
      <Link to="/create-audit">Create New Audit</Link>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Evaluation Period</th>
            <th className="border border-gray-300 p-2">Interns</th>
          </tr>
        </thead>
        <tbody>
          {audits.map((audit) => (
            <tr key={audit.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{audit.id}</td>
              <td className="border border-gray-300 p-2">
                {new Date(audit.date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2">
                {audit.evaluationPeriod}
              </td>
              <td className="border border-gray-300 p-2">
                {audit.interns.map((intern) => intern.name).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditList;
