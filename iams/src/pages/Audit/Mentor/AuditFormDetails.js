import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AuditInternDetails = () => {
  const { id } = useParams();
  const [auditIntern, setAuditIntern] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentGrade, setCurrentGrade] = useState(null);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/audit-form/audit-intern-form/${id}`)
      .then((response) => {
        setAuditIntern(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching audit intern details:", error);
        setError(
          "Unable to fetch audit intern details. Please try again later."
        );
      });
  }, [id]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!auditIntern)
    return <div className="text-gray-700 text-center py-8">Loading...</div>;

  const {
    auditInternId,
    internId,
    mentorId,
    createdTime,
    updatedTime,
    aveGrade,
    grades,
  } = auditIntern;

  const handleEditClick = (gradeId) => {
    const gradeToEdit = grades.find((grade) => grade.gradeId === gradeId);
    setCurrentGrade({ ...gradeToEdit });
    setIsEditing(true);
  };

  const handleGradeChange = (field, value) => {
    setCurrentGrade((prevGrade) => ({
      ...prevGrade,
      [field]: value,
    }));
  };

  const updateStatusAndGrade = () => {
    setIsLoading(true);

    const updatedData = {
      status,
      grade: currentGrade,
    };

    axios
      .put(
        `http://localhost:8080/audit-form/audit-intern-form/${id}/edit`,
        updatedData
      )
      .then((response) => {
        setAuditIntern((prev) => ({
          ...prev,
          status: response.data.status,
          grades: response.data.grades || prev.grades,
        }));
        alert("Status and grade updated successfully!");
        setIsEditing(false);
        setCurrentGrade(null);
      })
      .catch((error) => {
        console.error("Error updating status and grade:", error);
        alert("Failed to update status and grade.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setCurrentGrade(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Audit Intern Details
      </h1>
      <div className="bg-white shadow-md rounded-lg  mb-8 border">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 p-6 border-gray-200 bg-slate-100 ">
          <i className="bi bi-archive-fill mr-2"></i> Intern Information Details
        </h2>
        <div className="grid grid-cols-2 gap-4 px-6 pt-2 pb-8">
          <div>
            <label
              htmlFor="auditInternId"
              className="block text-sm font-medium text-gray-700"
            >
              Audit Intern ID
            </label>
            <input
              type="text"
              id="auditInternId"
              value={auditInternId}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="internId"
              className="block text-sm font-medium text-gray-700"
            >
              Intern ID
            </label>
            <input
              type="text"
              id="internId"
              value={internId}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="mentorId"
              className="block text-sm font-medium text-gray-700"
            >
              Mentor ID
            </label>
            <input
              type="text"
              id="mentorId"
              value={mentorId}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="aveGrade"
              className="block text-sm font-medium text-gray-700"
            >
              Average Grade
            </label>
            <input
              type="text"
              id="aveGrade"
              value={aveGrade}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="createdTime"
              className="block text-sm font-medium text-gray-700"
            >
              Created Time
            </label>
            <input
              type="text"
              id="createdTime"
              value={new Date(createdTime).toLocaleString()}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="updatedTime"
              className="block text-sm font-medium text-gray-700"
            >
              Updated Time
            </label>
            <input
              type="text"
              id="updatedTime"
              value={new Date(updatedTime).toLocaleString()}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg mb-8 border">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 p-6 border-gray-200 bg-slate-100">
          <i className="bi bi-ticket-detailed mr-2"></i> Grades
        </h2>
        <div className="px-6 pt-2 pb-8">
          {grades.length === 0 ? (
            <p>No grades available.</p>
          ) : (
            <table className="table-auto mx-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Grade ID</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Value</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Description
                  </th>
                  {/* <th className="border border-gray-300 px-4 py-2">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {grades.map((grade) => (
                  <tr key={grade.gradeId}>
                    <td className="border border-gray-300  px-4 py-2">
                      {grade.gradeId}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {grade.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {isEditing && currentGrade.gradeId === grade.gradeId ? (
                        <input
                          type="text"
                          value={currentGrade.value}
                          onChange={(e) =>
                            handleGradeChange("value", e.target.value)
                          }
                          className="border px-2 py-1"
                        />
                      ) : (
                        grade.value
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {isEditing && currentGrade.gradeId === grade.gradeId ? (
                        <input
                          type="text"
                          value={currentGrade.description}
                          onChange={(e) =>
                            handleGradeChange("description", e.target.value)
                          }
                          className="border px-2 py-1"
                        />
                      ) : (
                        grade.description
                      )}
                    </td>
                    {/* <td className="border border-gray-300 px-4 py-2">
                      {isEditing && currentGrade.gradeId === grade.gradeId ? (
                        <div>
                          <button
                            onClick={updateStatusAndGrade}
                            disabled={isLoading}
                            className={`px-4 py-2 rounded-lg text-white ${
                              isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                          >
                            {isLoading ? "Updating..." : "Save"}
                          </button>
                          <button
                            onClick={handleCancelClick}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditClick(grade.gradeId)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                      )}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditInternDetails;
