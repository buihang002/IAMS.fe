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

  if (!details) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 mr-6 ml-6">
      <h1 className="text-2xl font-bold mb-6 ">
        Audit Result Details for Intern ID:
        <span className="text-gray-600"> {details.internId}</span>
      </h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 mr-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block font-semibold mb-2">Result ID</label>
            <input
              type="text"
              value={id}
              readOnly
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Intern ID</label>
            <input
              type="text"
              value={details.internId}
              readOnly
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Mentor ID</label>
            <input
              type="text"
              value={details.mentorId}
              readOnly
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Cột thứ hai */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block font-semibold mb-2">Average Result</label>
            <input
              type="number"
              value={details.aveResult}
              readOnly
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Create Time</label>
            <input
              type="text"
              value={new Date(details.createTime).toLocaleString()}
              readOnly
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuditResultDetails;
