import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getPageName } from "../../utils/pageName";

const Navbar = ({ isOpen, toggleSidebar, resetSidebarState }) => {
  const location = useLocation();
  const pageName = getPageName(location.pathname);
  const navigate = useNavigate();

  // State để quản lý dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Hàm toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav
      className={`p-2 shadow bg-white flex justify-start items-center fixed top-0 transition-all 
      ${
        isOpen ? "ml-64" : "ml-16"
      } right-0 left-0 z-50 border-b border-gray-300`}
    >
      <i
        className="bi bi-grid text-gray-500 ml-6 hover:text-gray-800 cursor-pointer"
        onClick={toggleSidebar}
      ></i>
      <h1 className="m-0 font-bold text-gray-800 flex-grow text-start pl-4 text-sm">
        {pageName}
      </h1>

      {/* Avatar và Dropdown */}
      <div className="flex items-center relative">
        <div className="flex items-center mr-4 text-gray-500">
          <i className="bi bi-bell-fill mr-4" /> |
        </div>

        <img
          src="https://via.placeholder.com/40"
          alt="Avatar"
          className="w-8 h-8 mr-4 rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />
        <i className="bx bx-chevron-down text-gray-500 ml-2 cursor-pointer"></i>
        {isDropdownOpen && (
          <div className="absolute top-12 right-0 w-28 text-center bg-white rounded shadow-lg border border-gray-200">
            <ul className="py-2">
              <Link to="/profile">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <i className="bi bi-person-fill mr-2"></i> Profile
                </li>
              </Link>
              <div
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <i className="bi bi-box-arrow-right mr-2"></i> Logout
              </div>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
