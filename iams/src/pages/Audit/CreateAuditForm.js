import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateAuditForm = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAudit = {
      date,
      startTime,
      endTime,
      participants: participants.split(",").map((p) => p.trim()),
    };

    try {
      await axios.post("http://localhost:9999/audits", newAudit);
      navigate("/audit");
    } catch (error) {
      console.error("Error creating audit:", error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-4">Create Audit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Participants</label>
          <input
            type="text"
            placeholder="Enter participants, separated by commas"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateAuditForm;
