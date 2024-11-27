import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuditResultList = () => {
  const [auditResults, setAuditResults] = useState([]);
  const [internId, setInternId] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/audit-result/find-all")
      .then((response) => setAuditResults(response.data))
      .catch((error) => console.error("Error fetching audit results:", error));
  }, []);

  const filterByInternId = () => {
    if (!internId) return;

    axios
      .get(
        `http://localhost:8080/audit-result/intern/find-by-intern/${internId}`
      )
      .then((response) => setAuditResults(response.data))
      .catch((error) => console.error("Error filtering by intern ID:", error));
  };

  const filterByMentorId = () => {
    if (!mentorId) return;

    axios
      .get(`http://localhost:8080/audit-result/mentor/${mentorId}`)
      .then((response) => setAuditResults(response.data))
      .catch((error) => console.error("Error filtering by mentor ID:", error));
  };

  const filterByDate = () => {
    if (!month || !year) return;

    axios
      .get(
        `http://localhost:8080/audit-result/mentor/${mentorId}/get-by-date?month=${month}&year=${year}`
      )
      .then((response) => setAuditResults(response.data))
      .catch((error) => console.error("Error filtering by date:", error));
  };

  const handleViewDetails = (resultId) => {
    navigate(`/audit-result/${resultId}`);
  };

  return (
    <div className="container mx-auto p-4  ">
      <h1 className="text-2xl font-bold mb-4">Audit Result</h1>

      <div className="flex flex-wrap justify-end gap-2 mb-6">
        {/* Filter by Intern ID */}
        <div className="">
          <input
            type="text"
            placeholder="Intern ID"
            className="border border-gray-300 rounded-lg p-2 text-sm w-52"
            value={internId}
            onChange={(e) => setInternId(e.target.value)}
          />
          <button
            onClick={filterByInternId}
            className="hover:bg-white ml-2 hover:border-2 hover:border-gray-500 hover:text-gray-800 hover:shadow-sm text-white text-sm px-3 py-1 rounded-lg bg-gray-800"
          >
            <i className="bi bi-search" />
          </button>
        </div>

        {/* Filter by Date */}
        <div className="ml-4">
          <input
            type="number"
            placeholder="Month"
            className="border border-gray-300 rounded-lg p-2 text-sm w-52"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <input
            type="number"
            placeholder="Year"
            className="border border-gray-300 rounded-lg p-2 text-sm w-52"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button
            onClick={filterByDate}
            className="hover:bg-white ml-2 hover:border-2 hover:border-gray-500 hover:text-gray-800 hover:shadow-sm text-white text-sm px-3 py-1 rounded-lg bg-gray-800"
          >
            <i className="bi bi-search" />
          </button>
        </div>

        {/* Filter by Mentor ID */}
        {/* <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by Mentor ID"
            className="border border-gray-300 rounded-lg p-2 flex-grow"
            value={mentorId}
            onChange={(e) => setMentorId(e.target.value)}
          />
          <button
            onClick={filterByMentorId}
            className="hover:bg-white hover:border-2 hover:border-gray-500 hover:text-gray-800 hover:shadow-sm  text-white px-4 py-2 rounded-lg bg-gray-800"
          >
            <i className="bi bi-search" />
          </button>
        </div> */}

        {/* Filter by Date */}
        {/* <div className="flex gap-2 mb-6">
          <input
            type="number"
            placeholder="Month"
            className="border border-gray-300 rounded-lg p-2"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <input
            type="number"
            placeholder="Year"
            className="border border-gray-300 rounded-lg p-2"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button
            onClick={filterByDate}
            className="hover:bg-white hover:border-2 hover:border-gray-500 hover:text-gray-800 hover:shadow-sm  text-white px-4 py-2 rounded-lg bg-gray-800"
          >
            <i className="bi bi-search" />
          </button>
        </div> */}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">Result ID</th>
              <th className="px-4 py-2">Intern ID</th>
              <th className="px-4 py-2">Mentor ID</th>
              <th className="px-4 py-2">Average Result</th>
              <th className="px-4 py-2">Qualified</th>
              <th className="px-4 py-2">Create Time</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {auditResults.map((result) => (
              <tr
                key={result.resultId}
                className="odd:bg-gray-100 even:bg-gray-50 border-t hover:bg-gradient-to-r hover:bg-gray-50 border shadow-sm hover:scale-105 transition-transform transform duration-300"
              >
                <td className="px-4 py-2">{result.resultId}</td>
                <td className="px-4 py-2">{result.internId}</td>
                <td className="px-4 py-2">{result.mentorId}</td>
                <td className="px-4 py-2">{result.aveResult.toFixed(2)}</td>
                <td className="px-4 py-2">{result.isQualify ? "Yes" : "No"}</td>
                <td className="px-4 py-2">
                  {new Date(result.createTime).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleViewDetails(result.resultId)}
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
    </div>
  );
};

export default AuditResultList;
