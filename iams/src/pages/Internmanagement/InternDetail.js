import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../utils/MyAxios";

const InternDetails = () => {
  const { id } = useParams();
  const [intern, setIntern] = useState(null);
  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`/intern/profile/${id}`)
      .then((response) => {
        setIntern(response.data);
        setStatus(response.data.status);
      })
      .catch((error) => console.error("Error fetching intern details:", error));
  }, [id]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const updateStatus = () => {
    setIsLoading(true);
    axios
      .put(`/intern/${id}/change-intern-account-status`, {
        status,
      })
      .then((response) => {
        setIntern((prev) => ({ ...prev, status: response.data.status }));
        alert("Status updated successfully!");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        alert("Failed to update status.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!intern) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className=" ">
      <div className="ml-5 ">
        <Link to={"/intern"}>
          <button className=" mt-2  text-gray-600 hover:font-bold hover:text-gray-800">
            Back to List
          </button>
        </Link>
      </div>
      <div className="max-w-6xl mx-auto  p-6 bg-white">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 ">
          INTERN DETAILS
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 border-t-2  border-gray-200 p-4 ">
          <div className="p-4  ">
            <p className="font-semibold text-gray-700">ID:</p>
            <p className="pl-7 bg-gray-50 border border-gray-200 p-2 rounded-md mt-2 shadow-sm">
              {intern.userId}
            </p>
          </div>
          <div className="p-4  ">
            <p className="font-semibold text-gray-700">Full Name:</p>
            <p className="pl-7 bg-gray-50 border border-gray-200 p-2 rounded-md mt-2 shadow-sm">
              {intern.fullName}
            </p>
          </div>
          <div className="p-4  ">
            <p className="font-semibold text-gray-700">Account:</p>
            <p className="pl-7 bg-gray-50 border border-gray-200 p-2 rounded-md mt-2 shadow-sm">
              {intern.account}
            </p>
          </div>
          <div className="p-4  ">
            <p className="font-semibold text-gray-700">Phone:</p>
            <p className="pl-7 bg-gray-50 border border-gray-200 p-2 rounded-md mt-2 shadow-sm">
              {intern.phone}
            </p>
          </div>
          <div className="p-4  ">
            <p className="font-semibold text-gray-700">Gender:</p>
            <p className="pl-7 bg-gray-50 border border-gray-200 p-2 rounded-md mt-2 shadow-sm">
              {intern.gender ? "Male" : "Female"}
            </p>
          </div>
          <div className="p-4  ">
            <p className="font-semibold text-gray-700">Date of Birth:</p>
            <p className="pl-7 bg-gray-50 border border-gray-200 p-2 rounded-md mt-2 shadow-sm">
              {intern.dob}
            </p>
          </div>
          <div className="p-4 b">
            <p className="font-semibold text-gray-700">Address:</p>
            <p className="pl-7 bg-gray-50 border border-gray-200 p-2 rounded-md mt-2 shadow-sm">
              {intern.address}
            </p>
          </div>
          <div className="p-4  ">
            <p className="font-semibold text-gray-700">Social Number:</p>
            <p className="pl-7 bg-gray-50 border border-gray-200 p-2 rounded-md mt-2 shadow-sm">
              {intern.socialNum}
            </p>
          </div>
          <div className="p-4  ">
            <p className="font-semibold text-gray-700">Role:</p>
            <p className="pl-7 bg-gray-50 border border-gray-200 p-2 rounded-md mt-2 shadow-sm">
              {intern.role}
            </p>
          </div>
          <div className="p-4  ">
            <p className="font-semibold text-gray-700">Join Date:</p>
            <p className="pl-7 bg-gray-50 border border-gray-200 p-2 rounded-md mt-2 shadow-sm">
              {intern.joinDate}
            </p>
          </div>
          <div className="p-4  ">
            <p className="font-semibold text-gray-700">Mentor ID:</p>
            <p className="pl-7 bg-gray-50 border border-gray-200 p-2 rounded-md mt-2 shadow-sm">
              {intern.mentorId}
            </p>
          </div>

          <div className="p-4  ">
            <p className="font-semibold text-gray-700 ">Status:</p>
            {!isEditing ? (
              <div className=" items-center justify-between">
                <p className="pl-7 bg-gray-50 border border-gray-200 p-2 rounded-md mt-2 shadow-sm">
                  {intern.status}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4  mt-3 py-2 rounded-lg border font-bold border-gray-300 hover:text-gray-700 hover:bg-white bg-gray-800 text-white "
                >
                  Edit
                </button>
              </div>
            ) : (
              <div>
                <select
                  value={status}
                  onChange={handleStatusChange}
                  className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="WARNING">WARNING</option>
                  {/* <option value="DISQUALIFIED">DISQUALIFIED</option> */}
                </select>
                <div className="mt-2 flex space-x-4">
                  <button
                    onClick={updateStatus}
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-lg text-white ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {isLoading ? "Updating..." : "Save"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto  p-6 bg-white">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 ">AUDIT REPORT</h1>
        {/* <div className="flex flex-col">
          {intern.auditReports.map((auditReport) => (
            <div
              key={auditReport.id}
              className="bg-gray-50 border border-gray-200 p-4 rounded-md mb-4 shadow-sm"
            >
              <h2 className="text-lg font-bold mb-2 text-gray-800">
                Audit Report #{auditReport.id}
              </h2>
              <p className="text-gray-700">{auditReport.content}</p>
              <p className="text-gray-600 mt-2">
                Date: {auditReport.date} | Time: {auditReport.time}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default InternDetails;
