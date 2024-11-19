import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/MyAxios";

const InternDetails = () => {
  const { id } = useParams();
  const [intern, setIntern] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Fetch intern details
  useEffect(() => {
    const fetchInternDetails = async () => {
      try {
        const response = await axios.get(`/intern/profile/${id}`);
        setIntern(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch intern details");
        setLoading(false);
      }
    };

    fetchInternDetails();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle gender change
  const handleGenderChange = (e) => {
    const value = e.target.value === "true";
    setFormData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };

  // Save changes
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `/intern/${id}/change-intern-account-status`,
        formData
      );
      setIntern(response.data);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update intern details");
    }
  };

  // Back to list
  const handleBack = () => {
    navigate("/intern");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white   mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Intern Details
      </h1>
      {intern ? (
        <div>
          {isEditing ? (
            // Edit
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Editable Fields */}
              {["fullName", "phone", "dob", "address", "socialNum"].map(
                (field) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold mb-2 capitalize">
                      {field}
                    </label>
                    <input
                      type={field === "dob" ? "date" : "text"}
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                )
              )}

              {/* Gender Field */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleGenderChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value={false}>Male</option>
                  <option value={true}>Female</option>
                </select>
              </div>

              {/* Non-editable Fields */}
              {[
                "userId",
                "account",
                "joinDate",
                "status",
                "mentorId",
                "role",
              ].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold mb-2 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    value={formData[field] || ""}
                    readOnly
                    className="w-full border bg-gray-100 cursor-not-allowed px-4 py-2"
                  />
                </div>
              ))}

              <div className="col-span-2 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // View Mode
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 capitalize">
                    Full Name
                  </label>
                  <input
                    className="w-full border rounded-lg px-4 py-2"
                    value={intern.fullName || ""}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 capitalize">
                    Phone
                  </label>
                  <input
                    className="w-full border rounded-lg px-4 py-2"
                    value={intern.phone || ""}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 capitalize">
                    Dob
                  </label>
                  <input
                    className="w-full border rounded-lg px-4 py-2"
                    value={intern.dob || ""}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 capitalize">
                    Address
                  </label>
                  <input
                    className="w-full border rounded-lg px-4 py-2"
                    value={intern.address || ""}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 capitalize">
                    Social Num
                  </label>
                  <input
                    className="w-full border rounded-lg px-4 py-2"
                    value={intern.socialNum || ""}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 capitalize">
                    Gender
                  </label>
                  <input
                    className="w-full border rounded-lg px-4 py-2"
                    value={intern.gender ? "Female" : "Male" || ""}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 capitalize">
                    User ID
                  </label>
                  <input
                    className="w-full border rounded-lg px-4 py-2"
                    value={intern.userId || ""}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 capitalize">
                    Account
                  </label>
                  <input
                    className="w-full border rounded-lg px-4 py-2"
                    value={intern.account || ""}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 capitalize">
                    Join Date
                  </label>
                  <input
                    className="w-full border rounded-lg px-4 py-2"
                    value={intern.joinDate || ""}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 capitalize">
                    Status
                  </label>

                  <input
                    className="w-full border rounded-lg px-4 py-2"
                    value={intern.status || ""}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 capitalize">
                    Mentor
                  </label>
                  <input
                    className="w-full border rounded-lg px-4 py-2"
                    value={intern.mentorId || ""}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 capitalize">
                    Role
                  </label>
                  <input
                    className="w-full border rounded-lg px-4 py-2"
                    value={intern.role || ""}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleBack}
                  className="bg-gray-400 font-bold hover:bg-gray-600 hover:text-white hover:border border-gray-400   text-white px-6 py-2 rounded-lg mt-4"
                >
                  Back
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gray-800 font-bold hover:bg-white hover:text-gray-800 hover:border border-gray-800 text-white px-6 py-2 rounded-lg mt-4"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>No intern details found.</p>
      )}
    </div>
  );
};

export default InternDetails;
