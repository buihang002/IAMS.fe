import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const AuditResultDetails = () => {
  const { auditId } = useParams();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAuditDetails();
  }, [auditId]);

  const fetchAuditDetails = () => {
    axios
      .get(`http://localhost:8080/audit/${auditId}`)
      .then((response) => {
        setDetails(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching audit result details:", error);
        setError(
          "Unable to fetch audit result details. Please try again later."
        );
      });
  };

  const handleDeleteIntern = (id) => {
    if (!window.confirm("Are you sure you want to delete this intern?")) return;

    axios
      .delete(`http://localhost:8080/audit-form/audit-intern-form/${id}/delete`)
      .then(() => {
        alert("Intern deleted successfully.");
        fetchAuditDetails(); // Refresh the data
      })
      .catch((error) => {
        console.error("Error deleting intern:", error);
        alert("Failed to delete intern. Please try again.");
      });
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!details)
    return <div className="text-gray-700 text-center py-8">Loading...</div>;

  const { evaluationPeriod, date, auditInterns } = details;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 uppercase">
          detailed audit form -<span className="text-gray-500"> {auditId}</span>
        </h1>
        <p className="text-gray-600 mb-4 text-end">
          {new Date(date).toLocaleString()}
        </p>
      </div>
      {/* Summary Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 border">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b-2">
          <i className="bi bi-bookmark-fill mr-3"></i> Audit Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Audit ID:
            </label>
            <p className="text-gray-800 bg-gray-100 p-3 rounded-lg">
              {auditId}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Evaluation Period:
            </label>
            <p className="text-gray-800 bg-gray-100 p-3 rounded-lg">
              {evaluationPeriod}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Audit Date:
            </label>
            <p className="text-gray-800 bg-gray-100 p-3 rounded-lg">
              {new Date(date).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 border">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b-2">
          <i className="bi bi-person-down mr-3"></i>
          Audit Interns ({auditInterns.length})
        </h2>
        {auditInterns.length === 0 ? (
          <p className="text-gray-600 text-center mt-8">
            No audit interns found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auditInterns.map((intern) => (
              <div
                key={intern.auditInternId}
                className=" border rounded-lg hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col justify-between"
              >
                <div>
                  <p className="text-sm text-gray-700 border-b-2 p-5 mb-3 bg-gray-100">
                    <span className="font-bold uppercase">
                      {intern.internId}
                    </span>
                  </p>
                  <div className=" pl-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">Audit Intern ID:</span>{" "}
                      {intern.auditInternId}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">Average Grade:</span>{" "}
                      {intern.aveGrade || "0.0"}
                    </p>
                  </div>
                </div>
                <div className="space-x-2 flex justify-end p-3">
                  <Link
                    to={`/audit-intern/${intern.auditInternId}/evaluation`}
                    className="bg-blue-500 text-white px-2 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    Evaluate
                  </Link>
                  <Link
                    to={`/audit-form/audit-intern-form/${intern.auditInternId}`}
                    className="bg-purple-500 text-white px-2 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-300"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDeleteIntern(intern.auditInternId)}
                    className="bg-red-500 text-white px-2 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditResultDetails;
