import React, { useEffect, useState } from "react";
import axios from "../../../utils/MyAxios";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const AuditInformation = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async () => {
    setLoading(true);
    setError(null);
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) throw new Error("User not logged in.");

      const user = JSON.parse(userStr);
      const mentorId = user?.userId;

      if (!mentorId) throw new Error("No mentor ID found in localStorage.");

      const response = await axios.get(
        `/audit-form/audit-intern-form/get-by-mentor-id/${mentorId}`
      );

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

  const handleViewDetails = (auditId) => {
    navigate(`/audit/${auditId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Audit List</h1>
      <div className="flex items-center justify-end gap-4 mb-6">
        <Link
          to="/create-audit"
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-500 font-bold flex items-center"
        >
          <i className="bi bi-plus-circle-fill mr-2"></i>Create Audit
        </Link>
      </div>

      {loading ? (
        <p>Loading audits...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : audits.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          <i className="bi bi-folder-x text-4xl mb-2"></i>
          <p>No audits available. Start creating one!</p>
        </div>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2 text-left">Audit Intern ID</th>
              <th className="px-4 py-2 text-left">Intern ID</th>
              <th className="px-4 py-2 text-left">Mentor ID</th>
              <th className="px-4 py-2 text-left">Create Time</th>
              <th className="px-4 py-2 text-left">Update Time</th>
              <th className="px-4 py-2 text-left">Average Grade</th>
              <th className="px-4 py-2 text-left">Grades</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {audits.map((audit, index) => (
              <tr
                key={audit.auditInternId}
                className="border-t hover:text-gray-800 text-gray-500 hover:bg-gray-50 border shadow-sm hover:scale-105 transition-transform duration-300"
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2">{audit.auditInternId}</td>
                <td className="px-4 py-2">{audit.internId}</td>
                <td className="px-4 py-2">{audit.mentorId}</td>
                <td className="px-4 py-2">
                  {format(new Date(audit.createdTime), "dd/MM/yyyy HH:mm")}
                </td>
                <td className="px-4 py-2">
                  {format(new Date(audit.updatedTime), "dd/MM/yyyy HH:mm")}
                </td>
                <td className="px-4 py-2">{audit.aveGrade.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <ul className="list-disc pl-5">
                    {audit.grades.map((grade) => (
                      <li key={grade.gradeId}>
                        <strong>{grade.name}:</strong> {grade.value} -{" "}
                        <em>{grade.description}</em>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/audit-form/audit-intern-form/${audit.auditInternId}`
                      )
                    }
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

export default AuditInformation;
