import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AuditResultDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/audit-result/intern/${id}`)
      .then((response) => setDetails(response.data))
      .catch((error) =>
        console.error("Error fetching audit result details:", error)
      );
  }, [id]);

  if (!details)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Audit Result Details for Intern ID:
        <span className="text-blue-600"> {details.internId}</span>
      </h1>

      <form className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-8">
        {/* Cột thứ nhất */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Result ID
            </label>
            <input
              type="text"
              value={id}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Intern ID
            </label>
            <input
              type="text"
              value={details.internId}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Mentor ID
            </label>
            <input
              type="text"
              value={details.mentorId}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>
        </div>

        {/* Cột thứ hai */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Average Result
            </label>
            <input
              type="number"
              value={details.aveResult}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Create Time
            </label>
            <input
              type="text"
              value={new Date(details.createTime).toLocaleString()}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuditResultDetails;
