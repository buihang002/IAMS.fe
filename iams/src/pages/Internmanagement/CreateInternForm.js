import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/MyAxios";

const CreateInternForm = () => {
  const navigate = useNavigate();
  const [newIntern, setNewIntern] = useState({
    account: "",
    fullName: "",
    socialNum: "",
    mentorAccount: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIntern((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/authentication/intern/register", newIntern);
      navigate("/intern");
    } catch (err) {
      setError("Failed to create intern. Please try again.");
    }
  };

  return (
    <div className=" mt-11 p-6 bg-white m-7">
      <h1 className="text-2xl font-bold mb-6 p-2 bg-gray-200 rounded-md text-gray-900 text-center">
        NEW INTERN REGISTRATION FORM
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmitCreate}
        className="max-w-md mx-auto grid grid-cols-1 gap-4"
      >
        <div className="mb-4 font-bold text-gray-700 ">
          <label className="block text-gray-700 ">Account</label>
          <input
            type="email"
            name="account"
            value={newIntern.account}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded hover:border-gray-600 hover:border-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={newIntern.fullName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded hover:border-gray-600 hover:border-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Social Number</label>
          <input
            type="text"
            name="socialNum"
            value={newIntern.socialNum}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded hover:border-gray-600 hover:border-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700">
            Mentor Account
          </label>
          <input
            type="email"
            name="mentorAccount"
            value={newIntern.mentorAccount}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded hover:border-gray-600 hover:border-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/intern")}
            className="bg-gray-300 font-bold hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-gray-700 font-bold hover:bg-white hover:text-gray-700 hover:border hover:border-gray-700 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInternForm;
