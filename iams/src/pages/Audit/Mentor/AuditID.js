import React, { useEffect, useState } from "react";
import axios from "../../../utils/MyAxios";
import { Link, useNavigate } from "react-router-dom";

const AuditList = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    month: "",
    year: new Date().getFullYear(),
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async (month = "", year = "") => {
    setLoading(true);
    setError(null);

    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) throw new Error("User not logged in.");

      const user = JSON.parse(userStr);
      const mentorId = user?.userId;
      if (!mentorId) throw new Error("No mentor ID found in localStorage.");

      const endpoint =
        month && year
          ? `/audit/get-by-month?month=${month}&year=${year}`
          : `/audit/get-by-mentor/${mentorId}`;

      const response = await axios.get(endpoint);

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    const { month, year } = filters;
    fetchAudits(month, year);
  };

  const handleViewDetails = (auditId) => {
    navigate(`/audit/${auditId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Audit List</h1>
      <div className="flex items-center justify-end gap-4 mb-6">
        {/* Chọn tháng */}
        <div className="flex items-center gap-2">
          <label htmlFor="month-select" className="text-gray-700 font-medium">
            Month:
          </label>
          <select
            id="month-select"
            name="month"
            className="border border-gray-300 rounded-md px-3 py-2"
            value={filters.month}
            onChange={handleFilterChange}
          >
            <option value="">All Months</option>
            {[...Array(12).keys()].map((month) => (
              <option key={month + 1} value={month + 1}>
                {new Date(0, month).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </div>

        {/* Chọn năm */}
        <div className="flex items-center gap-2">
          <label htmlFor="year-select" className="text-gray-700 font-medium">
            Year:
          </label>
          <input
            id="year-select"
            type="number"
            name="year"
            className="border border-gray-300 rounded-md px-3 py-2 w-24"
            value={filters.year}
            onChange={handleFilterChange}
            min="2000"
            max="2100"
          />
        </div>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          onClick={applyFilters}
        >
          Search
        </button>
        <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
          <Link to="/create-audit">
            <i className="bi bi-plus-circle-fill mr-2"></i>Create Audit
          </Link>
        </button>
      </div>

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

export default AuditList;
