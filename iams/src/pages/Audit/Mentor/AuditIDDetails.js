import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const AuditResultDetails = () => {
  const { auditId } = useParams();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, [auditId]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!details)
    return <div className="text-gray-700 text-center py-8">Loading...</div>;

  const { evaluationPeriod, date, interns, auditInterns } = details;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Audit Result Details for Audit ID:{" "}
        <span className="text-blue-600">{auditId}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Evaluation Period
            </label>
            <input
              type="text"
              value={evaluationPeriod}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="text"
              value={new Date(date).toLocaleString()}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
            />
          </div>
        </div>
      </div>
      {/* Interns Section */}
      <h2 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">
        Interns
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {interns?.map((intern, index) => (
          <div
            key={`${intern.userId}-${index}`}
            className="p-6 bg-white shadow-md rounded-lg border border-gray-200"
          >
            <p className="text-gray-800 font-medium">
              <span className="font-bold text-gray-700">User ID:</span>{" "}
              {intern.userId}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Account:</span>{" "}
              {intern.account}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Full Name:</span>{" "}
              {intern.fullName}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Phone:</span>{" "}
              {intern.phone || "N/A"}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Gender:</span>{" "}
              {intern.gender ? "Male" : "Female"}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Date of Birth:</span>{" "}
              {intern.dob ? new Date(intern.dob).toLocaleDateString() : "N/A"}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Address:</span>{" "}
              {intern.address || "N/A"}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Social Number:</span>{" "}
              {intern.socialNum}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Status:</span>{" "}
              {intern.status}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Join Date:</span>{" "}
              {new Date(intern.joinDate).toLocaleDateString()}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Mentor ID:</span>{" "}
              {intern.mentorId}
            </p>
          </div>
        ))}
      </div>
      {/* Audit Interns Section */}
      <h2 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">
        Audit Interns
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {auditInterns?.map((auditIntern, index) => (
          <div
            key={`${auditIntern.auditInternId}-${index}`}
            className="p-6 bg-white shadow-md rounded-lg border border-gray-200"
          >
            <p className="text-gray-800 font-medium">
              <span className="font-bold text-gray-700">Audit Intern ID:</span>{" "}
              {auditIntern.auditInternId}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Intern ID:</span>{" "}
              {auditIntern.internId}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Mentor ID:</span>{" "}
              {auditIntern.mentorId}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Created Time:</span>{" "}
              {auditIntern.createdTime
                ? new Date(auditIntern.createdTime).toLocaleString()
                : "N/A"}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Updated Time:</span>{" "}
              {auditIntern.updatedTime
                ? new Date(auditIntern.updatedTime).toLocaleString()
                : "N/A"}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Average Grade:</span>{" "}
              {auditIntern.aveGrade || "0.0"}
            </p>
            <p className="text-gray-800">
              <span className="font-bold text-gray-700">Grades:</span>{" "}
              {auditIntern.grades.length > 0
                ? auditIntern.grades.join(", ")
                : "No Grades"}
            </p>
          </div>
        ))}
      </div>{" "}
      <div className="bg-white rounded shadow p-6 space-y-4">
        {auditInterns.length === 0 ? (
          <p>No audit interns found.</p>
        ) : (
          auditInterns.map((intern) => (
            <div
              key={intern.auditInternId}
              className="flex items-center justify-between border-b pb-4 mb-4"
            >
              <div>
                <p>
                  <span className="font-semibold">Audit Intern ID:</span>{" "}
                  {intern.auditInternId}
                </p>
                <p>
                  <span className="font-semibold">Intern ID:</span>{" "}
                  {intern.internId}
                </p>
                <p>
                  <span className="font-semibold">Mentor ID:</span>{" "}
                  {intern.mentorId}
                </p>
              </div>
              <Link
                to={`/audit-intern/${intern.auditInternId}/evaluation`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Evaluate
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AuditResultDetails;
