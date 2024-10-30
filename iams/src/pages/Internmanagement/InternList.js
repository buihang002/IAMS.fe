import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";

const InternList = ({ isOpen }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:9999/interns");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = () => {
    let results = users.filter((user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filterStatus) {
      results = results.filter((user) => user.status === filterStatus);
    }
    setFilteredUsers(results);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    let results = users;
    if (status) {
      results = users.filter((user) => user.status === status);
    }
    if (searchTerm) {
      results = results.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredUsers(results);
    setShowFilterDropdown(false); // Close dropdown after selecting
  };

  // Show dropdown and set a 5-second timer to hide it
  const toggleFilterDropdown = () => {
    setShowFilterDropdown(true);
    setTimeout(() => {
      setShowFilterDropdown(false);
    }, 5000);
  };

  return (
    <div className={`overflow-x-auto transition-all duration-300 mt-20 flex-1`}>
      <div className="p-2 flex items-center ">
        <input
          type="text"
          placeholder="Search by name..."
          className="p-2 w-1/3 ml-auto outline-none border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="p-3 bg-gray-200 text-gray-500  border border-gray-50 hover:bg-slate-200 rounded ml-2"
        >
          <FaSearch />
        </button>
        <div className=" ml-2">
          {/* Filter Icon */}
          <button className="p-2 flex gap-3 items-center bg-gray-200   border border-gray-50 hover:bg-slate-200 rounded ml-2 ">
            <div className="text-gray-500">
              <FaFilter />
            </div>
            <p className="font-semibold">Status</p>

            <i
              onClick={toggleFilterDropdown}
              className="bi bi-arrow-down-square-fill hover:text-white"
            ></i>
          </button>
          {/* Filter Dropdown */}
          {showFilterDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg">
              <button
                onClick={() => handleFilter("Active")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Active
              </button>
              <button
                onClick={() => handleFilter("Deactive")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Deactive
              </button>
              <button
                onClick={() => handleFilter("")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Intern List Table */}
      <table className="min-w-full bg-white border border-gray-200 mt-4">
        <thead>
          <tr className="bg-gray-950 text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Role</th>
            <th className="py-3 px-6 text-left">Account</th>
            <th className="py-3 px-6 text-left">Phone</th>
            <th className="py-3 px-6 text-left">Join Date</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">View Detail</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">{user.id}</td>
              <td className="flex items-center py-3 px-6 text-left">
                <img
                  src={user.avatar}
                  alt={`${user.fullName}'s avatar`}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">{user.fullName}</div>
              </td>
              <td className="py-3 px-6 text-left">{user.role}</td>
              <td className="py-3 px-6 text-left">{user.account}</td>
              <td className="py-3 px-6 text-left">{user.phone}</td>
              <td className="py-3 px-6 text-left">{user.joinDate}</td>
              <td className="py-3 px-6 text-left flex items-center">
                {user.status === "Active" ? (
                  <span className="flex items-center">
                    <span className="inline-block w-3 h-3 mr-2 bg-green-500 rounded-full"></span>
                    <span className="text-green-600 font-semibold">Active</span>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="inline-block w-3 h-3 mr-2 bg-red-500 rounded-full"></span>
                    <span className="text-red-600 font-semibold">Deactive</span>
                  </span>
                )}
              </td>
              <td className="py-3 px-6 text-left">
                <Link
                  to={`/interns/${user.id}`}
                  className="text-indigo-600 hover:underline"
                >
                  View Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InternList;
