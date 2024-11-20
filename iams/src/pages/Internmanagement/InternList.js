import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/MyAxios";
const InternList = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchKeyword, setSearchKeyword] = useState("");

  // Fetch ACTIVE interns - dự bị
  const fetchActiveInterns = async (mentorId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `/intern/${mentorId}/status/get-active`
      );
      setInterns(response.data);
    } catch (err) {
      setError("Failed to fetch active interns. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Search interns by name - dự bị
  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      fetchInterns();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/intern/search-keyword`, {
        params: { name: searchKeyword },
      });
      setInterns(response.data);
    } catch (err) {
      setError("Failed to search interns. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const fetchInterns = async (mentorId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `/intern/get-by-mentor/${mentorId}`
        // `/intern/get-all`
      );
      setInterns(response.data);
    } catch (err) {
      setError("Failed to fetch interns. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this intern?")) {
      try {
        const response = await axiosInstance.delete(`/intern/delete/${id}`);
        if (response.status === 200) {
          fetchInterns();
        } else {
          setError("Failed to delete intern. Please try again.");
        }
      } catch (err) {
        setError("Failed to delete intern. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchInterns();
  }, []);
  console.log(interns);
  return (
    <div className="max-w-7xl mx-auto mt-11 px-4">
      <h1 className="text-3xl font-bold "> Intern Management</h1>
      <p className="text-gray-500 text-sm">
        Manage intern roster and progress details
      </p>
      <div className="  border-gray-200 grid grid-cols-2 gap-5">
        <div className="text-gray-500 mb-4 mt-4 justify-start">
          <strong>All Interns:</strong> {interns.length}
        </div>
        {/* <div className="m-4 border shadow-sm border-gray-200 h-60 w-100 overflow-y-scroll rounded-md scrollbar scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200">
          <div className=" pl-10 p-4  border-b font-bold ">
            Total Interns: {interns.length} interns
          </div>
          <ul class=" ">
            {interns.map((intern, index) => (
              <tr key={intern.userId}>
                <td className="px-11 py-2 text-center">{index + 1}</td>

                <td className="px-4 py-2">{intern.fullName}</td>
                <td className="px-4 py-2">{intern.account}</td>
              </tr>
            ))}
          </ul>
        </div> */}
        {/* <div>
          <div className="m-4 border shadow-lg border-gray-200 h-30 w-100 "></div>
          <div className="m-4 border shadow-lg border-gray-200 h-20 w-100 ">
            Total Active Interns:
            {interns.filter((intern) => intern.status === "ACTIVE").length}
          </div>
        </div> */}
      </div>
      <div className=" flex justify-end items-center mb-6 mt-7">
        <input
          type="text"
          placeholder="Search by name"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border border-gray-300 px-2 py-2 rounded-lg w-1/3"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 border border-blue-500 ml-2 font-bold text-white hover:text-black px-2 py-2 transition-transform transform hover:scale-110 hover:bg-gradient-to-r hover:from-white hover:to-white duration-300 rounded-xl"
        >
          <i className="bi bi-search-heart mr-2" />
          Search
        </button>
        <button
          onClick={fetchActiveInterns}
          className="bg-green-600 border ml-4 mr-4 border-green-500 font-bold text-white hover:text-green-600  px-2 py-2 transition-transform transform hover:scale-110 hover:bg-gradient-to-r hover:from-white hover:to-white duration-300 rounded-xl"
        >
          {" "}
          <i class=" bi bi-record-fill mr-2"></i>
          Active Interns
        </button>
        <button
          onClick={fetchInterns}
          className=" bg-gray-800 border border-gray-600 font-bold text-white hover:text-black px-4 py-2 transition-transform transform hover:scale-110 hover:bg-gradient-to-r hover:from-white hover:to-white duration-300 rounded-xl mr-4"
        >
          <i className="bi bi-justify mr-2"></i>
          All Interns
        </button>

        <Link
          to="/intern/create-intern"
          className=" bg-gray-800 border border-gray-600 font-bold  text-white hover:text-black px-2 py-2 transition-transform transform hover:scale-110 hover:bg-gradient-to-r hover:from-white hover:to-white duration-300 rounded-xl"
        >
          <i className="bi bi-file-earmark-plus-fill mr-1" /> Create Intern
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && interns.length === 0 && (
        <p>No interns found. Add one using the button above.</p>
      )}
      {!loading && !error && interns.length > 0 && (
        <table className="table-auto w-full bg-white border border-gray-200 shadow rounded-xl">
          <thead>
            <tr className="text-xl font-bold bg-gray-800 text-white border">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Account</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Social Number</th>
              <th className="px-4 py-2">Mentor</th>
              <th className="px-4 py-2">Join Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {interns.map((intern, index) => (
              <tr
                key={intern.userId}
                className="border-t hover:bg-gradient-to-r hover:from-blue-300 hover:to-white hover:scale-105 transition-transform transform duration-300"
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2">{intern.account}</td>
                <td className="px-4 py-2">{intern.fullName}</td>
                <td className="px-4 py-2">{intern.socialNum}</td>
                <td className="px-4 py-2 text-center">{intern.mentorId}</td>
                <td className="px-4 py-2 text-center">
                  {intern.joinDate
                    ? new Date(intern.joinDate).toLocaleDateString("en-GB")
                    : "N/A"}
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`inline-block w-3.5 h-3.5 rounded-full mr-2 ${(() => {
                      switch (intern.status) {
                        case "ACTIVE":
                          return "bg-green-500";
                        case "INACTIVE":
                          return "bg-red-500";
                        case "WARNING":
                          return "bg-yellow-500";
                        case "DISQUALIFIED":
                          return "bg-orange-500";
                        default:
                          return "bg-gray-500";
                      }
                    })()}`}
                  ></span>

                  {intern.status}
                </td>
                <td className="px-4 py-2 text-center">
                  <Link
                    to={`/intern/profile/${intern.userId}`}
                    className="bg-transparent hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-300 text-blue-500 px-3 py-1 rounded-full transition-all duration-300 transform hover:scale-110 mr-2"
                  >
                    <i className="bi bi-eye-fill" />
                  </Link>
                  <button
                    onClick={() => handleDelete(intern.userId)}
                    className="bg-transparent hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-300 text-red-500 px-3 py-1 rounded-full transition-all duration-300 transform hover:scale-110"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InternList;
