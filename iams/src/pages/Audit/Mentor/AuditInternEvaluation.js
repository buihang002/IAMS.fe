import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AuditInternEvaluation = () => {
  const { id } = useParams();
  const [grades, setGrades] = useState([]);
  const [newGrades, setNewGrades] = useState([
    { name: "DISCIPLINE", value: "", description: "" },
    { name: "WORK", value: "", description: "" },
    { name: "ACTIVITY_AND_ATTITUDE", value: "", description: "" },
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/audit-form/audit-intern-form/${id}`)
      .then((response) => {
        setGrades(response.data.grades || []);
        setMessage("");
      })
      .catch((error) => {
        console.error("Error fetching grades:", error);
        setMessage("Unable to fetch grades. Please try again later.");
      });
  }, [id]);

  const handleNewGradeChange = (index, field, value) => {
    const updatedNewGrades = [...newGrades];
    updatedNewGrades[index][field] = value;
    setNewGrades(updatedNewGrades);
  };

  const handleSubmitNewGrades = async (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to submit the evaluation?")) {
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `http://localhost:8080/audit-form/audit-intern-form/${id}/evaluation`,
        newGrades
      );
      setMessage("New grades submitted successfully!");
    } catch (error) {
      console.error("Error submitting new grades:", error);
      setMessage(
        error.response?.data?.message || "Failed to submit new grades."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGradeChange = (index, field, value) => {
    const updatedGrades = [...grades];
    updatedGrades[index][field] = value;
    setGrades(updatedGrades);
  };

  const handleSaveGrades = async () => {
    if (!window.confirm("Are you sure you want to save the changes?")) {
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `http://localhost:8080/audit-form/audit-intern-form/${id}/edit`,
        grades
      );
      setMessage("Grades updated successfully!");
    } catch (error) {
      console.error("Error updating grades:", error);
      setMessage(error.response?.data?.message || "Failed to update grades.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Audit Intern Evaluation
      </h1>

      {/* Thông báo */}
      {message && (
        <div
          className={`fixed top-14 right-4 z-50 p-4 rounded shadow-lg ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg mb-8 border">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 p-6 border-gray-200 bg-slate-100">
          <i className="mr-2 bi bi-bar-chart-fill"></i> Submit New Grades
        </h2>
        <form
          onSubmit={handleSubmitNewGrades}
          className="space-y-6 px-6 pt-2 pb-8"
        >
          {newGrades.map((grade, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
            >
              <label className="font-semibold text-gray-700">
                {grade.name}
              </label>
              <input
                type="number"
                step="0.1"
                max="10"
                min="0"
                value={grade.value}
                onChange={(e) =>
                  handleNewGradeChange(index, "value", e.target.value)
                }
                placeholder="Enter value (0-10)"
                className="p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-300"
                required
              />
              <input
                type="text"
                value={grade.description}
                onChange={(e) =>
                  handleNewGradeChange(index, "description", e.target.value)
                }
                placeholder="Enter description"
                className="p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-300"
                required
              />
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-gray-800 text-white px-6 py-2 rounded shadow ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Grades"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg mb-8 border">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 p-6 border-gray-200 bg-slate-100">
          <i class="mr-2 bi bi-pencil-square"></i> Edit Existing Grades
        </h2>
        <div className="px-6 pt-2 pb-8">
          {grades.length === 0 ? (
            <p>No grades available.</p>
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              {grades.map((grade, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4"
                >
                  <label className="font-semibold text-gray-700">
                    Grade {index + 1}: {grade.name}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    max="10"
                    min="0"
                    value={grade.value}
                    onChange={(e) =>
                      handleGradeChange(index, "value", e.target.value)
                    }
                    placeholder="Enter value (0-10)"
                    className="p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-300"
                  />
                  <input
                    type="text"
                    value={grade.description}
                    onChange={(e) =>
                      handleGradeChange(index, "description", e.target.value)
                    }
                    placeholder="Enter description"
                    className="p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-300"
                  />
                </div>
              ))}
              <div className="grid justify-end">
                <button
                  type="button"
                  onClick={handleSaveGrades}
                  className={`bg-gray-800 text-white px-6 py-2 rounded shadow ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditInternEvaluation;
