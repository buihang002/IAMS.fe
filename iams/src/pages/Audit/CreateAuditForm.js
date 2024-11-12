import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Install this package for unique IDs: npm install uuid

const CreateAudit = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!date || !startTime || !endTime || !participants) {
      setError("Please fill in all fields.");
      return;
    }

    const newAudit = {
      id: uuidv4(), // Generates a unique ID
      date,
      startTime,
      endTime,
      participants: participants.split(",").map((p) => p.trim()), // Split and trim participant names
    };

    try {
      await axios.post("http://localhost:3001/audits", newAudit);
      navigate("/audits"); // Redirect to audit list page
    } catch (error) {
      console.error("Error creating audit:", error);
      setError("There was an error saving the audit. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-8 mt-12 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Create New Audit
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">
            Start Time
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">
            Participants
          </label>
          <input
            type="text"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            className="mt-1 border-gray-300 rounded-md w-full"
            placeholder="Separate names with commas"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Save Audit
        </button>
      </form>
    </div>
  );
};

export default CreateAudit;
