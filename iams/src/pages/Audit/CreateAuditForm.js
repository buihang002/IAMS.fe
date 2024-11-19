import React, { useState } from "react";
import axios from "axios";

const CreateAuditForm = () => {
  const [date, setDate] = useState("");
  const [evaluationPeriod, setEvaluationPeriod] = useState("WEEKLY");
  const [interns, setInterns] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { date, evaluationPeriod, interns: interns.split(",") };

    axios
      .post("http://localhost:8080/audit/create-new-form", data)
      .then(() => {
        alert("Audit created successfully!");
      })
      .catch((error) => console.error("Error creating audit:", error));
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Create New Audit</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Evaluation Period</label>
          <select
            value={evaluationPeriod}
            onChange={(e) => setEvaluationPeriod(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
          >
            <option value="WEEKLY">Weekly</option>
            <option value="FORTNIGHT">Fortnight</option>
            <option value="MONTHLY">Monthly</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">
            Interns (Comma-separated IDs)
          </label>
          <input
            type="text"
            placeholder="Enter intern IDs"
            value={interns}
            onChange={(e) => setInterns(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateAuditForm;
