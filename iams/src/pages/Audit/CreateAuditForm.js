import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/MyAxios";
import { Link } from "react-router-dom";

const CreateFormAudit = () => {
  const [formData, setFormData] = useState({
    mentorId: "",
    evaluationPeriod: 0,
    interns: [],
  });

  const [interns, setInterns] = useState([]);
  const [filteredInterns, setFilteredInterns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state

  useEffect(() => {
    const fetchInterns = async () => {
      setLoading(true);
      setError(null);
      try {
        const userStr = localStorage.getItem("user");
        const user = JSON.parse(userStr);
        const userId = user?.userId;

        if (!userId) {
          setError("No user ID found in localStorage.");
          return;
        }

        const response = await axiosInstance.get(
          `/intern/get-by-mentor/${userId}`
        );

        if (response && response.data) {
          setInterns(response.data);
          setFilteredInterns(response.data); // Initialize with all interns
        } else {
          setError("No interns found for this mentor.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err.response?.data?.message ||
            "Failed to fetch interns. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInterns();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterInterns(e.target.value);
  };

  const filterInterns = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = interns.filter(
      (intern) =>
        intern.fullName.toLowerCase().includes(lowercasedQuery) ||
        intern.userId.toString().includes(lowercasedQuery)
    );
    setFilteredInterns(filtered);
  };

  const handleAddIntern = (userId) => {
    if (!formData.interns.includes(userId)) {
      setFormData({
        ...formData,
        interns: [...formData.interns, userId],
      });
    }
  };

  const handleRemoveIntern = (userId) => {
    setFormData({
      ...formData,
      interns: formData.interns.filter((id) => id !== userId),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axiosInstance.post(
        "/audit/create-new-form",
        formData
      );
      if (response.status === 200) {
        setSuccessMessage("Audit form created successfully!");
        setFormData({
          mentorId: "",
          evaluationPeriod: 0,
          interns: [],
        });
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ||
          "Failed to create audit form. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <Link to={"/audit"}>
        <button className="px-4 mb-6  text-gray-600 hover:font-bold hover:text-gray-800">
          Back to List
        </button>
      </Link>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Create Audit Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label
            htmlFor="mentorId"
            className="block text-lg font-medium text-gray-800"
          >
            Mentor
          </label>
          <input
            type="text"
            name="mentorId"
            id="mentorId"
            value={formData.mentorId}
            onChange={(e) =>
              setFormData({ ...formData, mentorId: e.target.value })
            }
            placeholder="Enter mentor ID"
            className="mt-2 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="evaluationPeriod"
            className="block text-lg font-medium text-gray-800"
          >
            Evaluation Period
          </label>
          <select
            name="evaluationPeriod"
            id="evaluationPeriod"
            value={formData.evaluationPeriod}
            onChange={(e) =>
              setFormData({ ...formData, evaluationPeriod: e.target.value })
            }
            className="mt-2 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value={0}>Weekly</option>
            <option value={1}>Fortnight</option>
            <option value={2}>Monthly</option>
          </select>
        </div>

        {/* Interns */}
        <div className="grid grid-cols-2 gap-6">
          {/* Add Intern */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Add Intern
            </h2>
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search interns by name or ID"
                className="mt-2 w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
              />
              <i className="bi bi-search absolute top-4 left-3 text-gray-500"></i>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading interns...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <ul className="space-y-4">
                {filteredInterns.map((intern) => (
                  <li
                    key={intern.userId}
                    className="flex justify-between items-center bg-gray-50 px-4 py-2 border rounded-lg shadow-sm"
                  >
                    <div className="grid grid-cols-3 gap-4 border-gray-300">
                      <div className="px-4 py-2 text-gray-700 font-semibold">
                        ID: {intern.userId}
                      </div>
                      <div className="px-4 py-2 text-gray-700">
                        Name: {intern.fullName}
                      </div>
                      <div className="px-4 py-2 text-gray-700">
                        <span
                          className={`inline-block w-3.5 h-3.5 rounded-full mr-2 ${(() => {
                            switch (intern.status) {
                              case "ACTIVE":
                                return "bg-green-500";
                              case "INACTIVE":
                                return "bg-red-500";
                              case "WARNING":
                                return "bg-yellow-500";
                              case "DISQUALIFIED":
                                return "bg-gray-500";
                              default:
                                return "bg-gray-500";
                            }
                          })()}`}
                        ></span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddIntern(intern.userId)}
                      className="px-3 py-1 bg-gray-700 text-white hover:font-bold rounded-lg shadow-sm hover:scale-105 transform transition duration-30 hover:bg-white hover:text-gray-600 border border-gray-600"
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Display Added Interns */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Added Interns
            </h2>
            {formData.interns.length > 0 ? (
              <ul className="space-y-4">
                {formData.interns.map((userId, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-50 px-4 py-2 border rounded-lg shadow-sm"
                  >
                    <th className="text-gray-700">
                      <td className="text-gray-700">{userId}</td>
                    </th>
                    <button
                      type="button"
                      onClick={() => handleRemoveIntern(userId)}
                      className="text-red-600 hover:font-bold hover:scale-105 transform transition duration-30"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No interns added yet.</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Create
          </button>
        </div>
      </form>
      {successMessage && (
        <div className="mt-12 fixed top-4 right-4 p-4 bg-green-100 text-green-800 border border-green-500 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-4 right-4 p-4 bg-red-100 text-red-800 border border-red-500 rounded-lg shadow-lg">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default CreateFormAudit;
