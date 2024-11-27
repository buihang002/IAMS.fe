import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AuditDetail = () => {
  const { id } = useParams();
  const [auditDetail, setAuditDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuditDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:8080/audit-form/audit-intern-form/${id}`
        );
        setAuditDetail(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch audit details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAuditDetail();
  }, [id]);

  const handleInputChange = (field, value) => {
    setAuditDetail((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-center text-blue-500 text-lg">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-center text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="p-6 min-h-screen">
      <div className="flex ">
        <button
          className="px-4 py-2  text-gray-800 rounded hover:font-bold hover:underline"
          onClick={() => window.history.back()}
        >
          Back to list
        </button>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Audit Details
      </h1>
      <div className="bg-white p-6  max-w-3xl mx-auto">
        <div className="grid grid-cols-[1fr_3fr] gap-4">
          <label className="font-semibold text-gray-700">Audit ID:</label>
          <input
            type="text"
            value={auditDetail.auditInternId}
            readOnly
            className="p-2 border rounded bg-gray-100"
          />

          <label className="font-semibold text-gray-700">Intern ID:</label>
          <input
            type="text"
            value={auditDetail.internId}
            readOnly
            className="p-2 border rounded bg-gray-100"
          />

          <label className="font-semibold text-gray-700">Mentor ID:</label>
          <input
            type="text"
            value={auditDetail.mentorId}
            onChange={(e) => handleInputChange("mentorId", e.target.value)}
            className="p-2 border rounded bg-gray-100"
          />

          <label className="font-semibold text-gray-700">Created Time:</label>
          <input
            type="text"
            value={new Date(auditDetail.createdTime).toLocaleString()}
            readOnly
            className="p-2 border rounded bg-gray-100"
          />

          <label className="font-semibold text-gray-700">Updated Time:</label>
          <input
            type="text"
            value={new Date(auditDetail.updatedTime).toLocaleString()}
            readOnly
            className="p-2 border rounded bg-gray-100"
          />

          <label className="font-semibold text-gray-700">Average Grade:</label>
          <input
            value={auditDetail.aveGrade.toFixed(2)}
            onChange={(e) =>
              handleInputChange("aveGrade", parseFloat(e.target.value))
            }
            className="p-2 border rounded bg-gray-100 font-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default AuditDetail;
