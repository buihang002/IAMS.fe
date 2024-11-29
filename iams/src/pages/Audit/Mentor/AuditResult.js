import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuditResultList = () => {
  const [auditResults, setAuditResults] = useState([]);
  const [filters, setFilters] = useState({
    internId: "",
    month: "",
    year: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [mentorId, setMentorId] = useState(null);

  const currentYear = new Date().getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      setError("User not logged in.");
      return;
    }
    const user = JSON.parse(userStr);
    if (!user?.userId) {
      setError("No mentor ID found in localStorage.");
      return;
    }
    setMentorId(user.userId);
    fetchAuditResults(user.userId);
  }, []);

  const fetchAuditResults = async (mentorId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8080/audit-result/mentor/${mentorId}`
      );
      setAuditResults(response.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || "Failed to fetch audits.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filterByDate = async () => {
    const { month, year } = filters;
    if (!mentorId) {
      setError("No mentor ID available.");
      return;
    }
    if (!month || !year) {
      setError("Please select both month and year.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:8080/audit-result/mentor/${mentorId}/get-by-date?month=${month}&year=${year}`
      );
      setAuditResults(response.data || []);
    } catch (err) {
      console.error("Error filtering by date:", err);
      setError(err.response?.data?.message || "Failed to filter by Date.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (resultId) => {
    navigate(`/audit-result/intern/${resultId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Audit Result List</h1>

      <div className="flex flex-wrap gap-4 mb-6 justify-end">
        <div>
          <input
            type="text"
            name="internId"
            placeholder="Intern ID"
            className="border border-gray-300 rounded-lg p-2 text-sm w-52"
            value={filters.internId}
            onChange={handleFilterChange}
          />
          <button
            onClick={() => fetchAuditResults(mentorId)}
            className="ml-2 text-white text-sm px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            Search
          </button>
        </div>

        <div className="flex items-center gap-2">
          <select
            name="month"
            className="border border-gray-300 rounded-lg p-2 text-sm w-32"
            value={filters.month}
            onChange={handleFilterChange}
          >
            <option value="">Select Month</option>
            {months.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>

          <select
            name="year"
            className="border border-gray-300 rounded-lg p-2 text-sm w-32"
            value={filters.year}
            onChange={handleFilterChange}
          >
            <option value="">Select Year</option>
            {Array.from({ length: 5 }, (_, i) => currentYear - i).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>

          <button
            onClick={filterByDate}
            className="text-white text-sm px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            Search
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">Result ID</th>
              <th className="px-4 py-2">Intern ID</th>
              <th className="px-4 py-2">Mentor ID</th>
              <th className="px-4 py-2">Average Result</th>
              <th className="px-4 py-2">Create Time</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {auditResults.map((result) => (
              <tr
                key={result.resultId}
                className="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200"
              >
                <td className="px-4 py-2">{result.resultId}</td>
                <td className="px-4 py-2">{result.internId}</td>
                <td className="px-4 py-2">{result.mentorId}</td>
                <td className="px-4 py-2">{result.aveResult.toFixed(2)}</td>
                <td className="px-4 py-2">
                  {new Date(result.createTime).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleViewDetails(result.resultId)}
                    className="text-gray-600 hover:text-gray-800"
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

export default AuditResultList;
