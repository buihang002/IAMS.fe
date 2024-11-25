import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      className={`bg-slate-950 text-white p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } h-screen fixed top-0 left-0`}
    >
      <div className="text-center text-2xl mb-4 font-bold bg-gradient-to-r from-blue-500  to-white bg-clip-text text-transparent hover:from-blue-400 hover:via-green-500 hover:to-yellow-500 active:from-indigo-600 active:via-cyan-500 active:to-teal-400 transform transition-transform duration-300 ease-in-out">
        IAMS
      </div>
      <button
        onClick={toggleSidebar}
        className="mt-5 px-4 py-2 bg-gray-500 text-white rounded w-full text-center"
      >
        {isOpen ? "Collapse" : <i className="bi bi-list"></i>}
      </button>
      {/* Danh sách mục điều hướng */}
      <ul className="list-none p-0 m-0">
        <div className="text-xs font-bold text-gray-500 pt-7">MAIN MENU</div>

        <div className="ml-2 mt-4">
          {user?.role === "INTERN" && (
            <li className="text-lg p-2 font-bold bg-gradient-to-br from-white to-white bg-clip-text text-transparent hover:from-blue-500 hover:to-white active:from-indigo-600 active:via-cyan-500 active:to-teal-400 transform transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
              <Link to="/dashboardintern" className="flex items-center">
                <i className={`bi bi-calendar3 ${isOpen ? "mr-2" : ""}`} />
                {isOpen && "Dashboard Intern"}
              </Link>
            </li>
          )}
          {user?.role === "MENTOR" && (
            <li className="text-lg p-2 font-bold bg-gradient-to-br from-white to-white bg-clip-text text-transparent hover:from-blue-500 hover:to-white active:from-indigo-600 active:via-cyan-500 active:to-teal-400 transform transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
              <Link to="/dashboardmentor" className="flex items-center">
                <i className={`bi bi-calendar3 ${isOpen ? "mr-2" : ""}`} />
                {isOpen && "Dashboard Mentor"}
              </Link>
            </li>
          )}
          {user?.role === "INTERN" && (
            <li className="text-lg p-2 font-bold bg-gradient-to-br from-white to-white bg-clip-text text-transparent hover:from-blue-500 hover:to-white active:from-indigo-600 active:via-cyan-500 active:to-teal-400 transform transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
              <Link to="/dailyreport" className="flex items-center">
                <i className={`bi bi-calendar3 ${isOpen ? "mr-2" : ""}`} />
                {isOpen && "Daily Report"}
              </Link>
            </li>
          )}
          {user?.role === "MENTOR" && (
            <li className="mt-3 text-lg p-2 font-bold bg-gradient-to-br from-white to-white bg-clip-text text-transparent hover:from-blue-500 hover:to-white active:from-indigo-600 active:via-cyan-500 active:to-teal-400 transform transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
              <Link to="/audit" className="flex items-center">
                <i className={`bi bi-bookmarks ${isOpen ? "mr-2" : ""}`} />
                {isOpen && "Audit"}
              </Link>
            </li>
          )}
          {user?.role === "MENTOR" && (
            <li className="mt-3 text-lg p-2 font-bold bg-gradient-to-br from-white to-white bg-clip-text text-transparent hover:from-blue-500 hover:to-white active:from-indigo-600 active:via-cyan-500 active:to-teal-400 transform transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
              <Link to="/intern" className="flex items-center">
                {isOpen ? (
                  <>
                    <i className="bi bi-people-fill mr-2"></i> Intern Management
                  </>
                ) : (
                  <i className="bi bi-people-fill"></i>
                )}
              </Link>
            </li>
          )}
        </div>
      </ul>
      <button
        onClick={handleLogout}
        className="mt-5 px-4 py-2 bg-red-500 text-white rounded w-full text-center"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
