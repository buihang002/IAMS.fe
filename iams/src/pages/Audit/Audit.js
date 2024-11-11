import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Audit = () => {
  const [audits, setAudits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async () => {
    try {
      const response = await axios.get("data/db.json");

      setAudits(response.data.audits);
    } catch (error) {
      console.error("Error fetching audits:", error);
    }
  };

  return (
    <div className="container mx-auto p-5 mt-11">
      <h2 className="text-2xl font-semibold mb-4">Audit List</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => navigate("/create-audit")}
      >
        Create Audit
      </button>

      <div className="mt-4">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-950 text-white uppercase text-sm leading-normal ">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
              <th className="px-4 py-2">Participants</th>
              <th className="px-4 py-2">View Details</th>
            </tr>
          </thead>
          <tbody>
            {audits.map((audit) => (
              <tr key={audit.id}>
                <td className="border px-4 py-2">{audit.date}</td>
                <td className="border px-4 py-2">{audit.startTime}</td>
                <td className="border px-4 py-2">{audit.endTime}</td>
                <td className="border px-4 py-2">
                  {audit.participants.join(", ")}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/audit/${audit.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Audit;
