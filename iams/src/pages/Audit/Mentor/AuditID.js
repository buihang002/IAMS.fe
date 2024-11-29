import React, { useEffect, useState } from "react";
import axios from "../../../utils/MyAxios";
import { Link, useNavigate } from "react-router-dom";

const AuditList = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ month: "", year: "" });
  const navigate = useNavigate();

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

  // Fetch audits on component mount
  useEffect(() => {
    fetchAuditsByMentor();
  }, []);

  // Fetch audits by mentor ID
  const fetchAuditsByMentor = async () => {
    setLoading(true);
    setError(null);

    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) throw new Error("User not logged in.");

      const user = JSON.parse(userStr);
      const mentorId = user?.userId;
      if (!mentorId) throw new Error("No mentor ID found in localStorage.");

      const endpoint = `/audit/get-by-mentor/${mentorId}`;
      const response = await axios.get(endpoint);

      setAudits(response?.data?.length > 0 ? response.data : []);
    } catch (err) {
      console.error("Error fetching audits by mentor:", err);
      setError(
        err.response?.data?.message || "Failed to fetch audits by mentor."
      );
      setAudits([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch audits by month and year
  const fetchAuditsByDate = async (month, year) => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = `/audit/get-by-month?month=${month}&year=${year}`;
      const response = await axios.get(endpoint);

      setAudits(response?.data?.length > 0 ? response.data : []);
    } catch (err) {
      console.error("Error fetching audits by date:", err);
      setError(
        err.response?.data?.message || "Failed to fetch audits by date."
      );
      setAudits([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Apply filters by month and year
  const filterByDate = () => {
    const { month, year } = filters;

    if (!month || !year) {
      setError("Please select both month and year.");
      return;
    }
    fetchAuditsByDate(month, year);
  };

  // Navigate to audit details
  const handleViewDetails = (auditId) => {
    navigate(`/audit/${auditId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Audit List</h1>

      {/* Filter Section */}
      <div className="flex items-center justify-end gap-4 mb-6">
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
        <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
          <Link to="/create-audit">
            <i className="bi bi-plus-circle-fill mr-2"></i>Create Audit
          </Link>
        </button>
      </div>

      {/* Audit Table */}
      {loading ? (
        <p>Loading audits...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : audits.length === 0 ? (
        <p>No audits available.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Evaluation Period</th>
              <th className="px-4 py-2 text-left">Audit Interns</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {audits.map((audit, index) => (
              <tr
                key={audit.auditId}
                className="border-t hover:text-gray-800 text-gray-500 hover:bg-gray-50 border shadow-sm hover:scale-105 transition-transform duration-300"
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2">{audit.date || "N/A"}</td>
                <td className="px-4 py-2">{audit.evaluationPeriod || "N/A"}</td>
                <td className="px-4 py-2">
                  {audit.auditInterns?.length > 0 ? (
                    <ul>
                      {audit.auditInterns.map((auditIntern, idx) => (
                        <li key={idx}>{auditIntern.internId || "Unknown"}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>No audit interns</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleViewDetails(audit.auditId)}
                    className="text-gray-600 hover:shadow-md hover:bg-slate-500 hover:text-white px-2 py-1 rounded-md"
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

export default AuditList;
