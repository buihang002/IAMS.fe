import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuditIntern = () => {
  const [auditData, setAuditData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuditData = async () => {
      setLoading(true);
      setError(null);

      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) throw new Error("User data not found in localStorage.");

        const user = JSON.parse(userStr);
        const internId = user?.userId;
        if (!internId) throw new Error("Invalid user ID.");

        const response = await axios.get(
          `http://localhost:8080/audit-form/audit-intern-form/my-audit/${internId}`
        );

        if (response?.data?.length) {
          setAuditData(response.data);
        } else {
          setError("No audit data found.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch audit data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAuditData();
  }, []);

  const handleViewDetail = (auditId) => {
    navigate(`/audit-detail/${auditId}`);
  };

  if (loading)
    return <p className="text-center text-blue-500">Loading data...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Audit Intern Information
      </h1>
      {auditData.length === 0 ? (
        <p className="text-gray-600">No audit data available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className=" px-4 py-2">#</th>
                <th className=" px-4 py-2">Audit ID</th>
                <th className=" px-4 py-2">Intern ID</th>
                <th className=" px-4 py-2">Mentor ID</th>
                <th className="px-4 py-2">Created Time</th>
                <th className=" px-4 py-2">Updated Time</th>
                <th className=" px-4 py-2">Average Grade</th>
                <th className=" px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {auditData.map((audit, index) => (
                <tr
                  key={audit.auditInternId}
                  className="odd:bg-gray-100 even:bg-gray-50 border-t hover:bg-gradient-to-r hover:bg-gray-50 border shadow-sm hover:scale-105 transition-transform transform duration-300"
                >
                  <td className=" px-4 py-2">{index + 1}</td>
                  <td className=" px-4 py-2">{audit.auditInternId}</td>
                  <td className=" px-4 py-2">{audit.internId}</td>
                  <td className=" px-4 py-2">{audit.mentorId}</td>
                  <td className=" px-4 py-2">
                    {audit.createdTime
                      ? new Date(audit.createdTime).toLocaleString()
                      : "Not available"}
                  </td>
                  <td className=" px-4 py-2">
                    {audit.updatedTime
                      ? new Date(audit.updatedTime).toLocaleString()
                      : "Not available"}
                  </td>
                  <td className=" px-4 py-2">{audit.aveGrade.toFixed(2)}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleViewDetail(audit.auditInternId)}
                      className="px-3 py-1 text-gray-600 text-sm rounded-lg hover:bg-gray-200 hover:shadow"
                    >
                      <i className="bi bi-eye-fill" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuditIntern;
