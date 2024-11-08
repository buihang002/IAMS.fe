import React from "react";
import { useLocation } from "react-router-dom";
import { getPageName } from "../../utils/pageName";

const Navbar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const pageName = getPageName(location.pathname);

  return (
    <nav
      className={`p-5 bg-white flex justify-start items-center fixed top-0 transition-all duration-300 
      ${
        isOpen ? "ml-64" : "ml-16"
      } right-0 left-0 z-50 border-b border-gray-300`}
    >
      {/* <button
        onClick={toggleSidebar}
        className="bg-gray-800 text-white w-10 h-10 p-2 rounded shadow hover:bg-gray-700 transition"
      >
        <i
          className={`bi ${isOpen ? "bi-chevron-left" : "bi-chevron-right"}`}
        ></i>
      </button> */}

      <h1 className="m-0 text-gray-800 flex-grow text-start pl-4">
        {pageName}
      </h1>

      <div className="flex items-center relative"></div>
    </nav>
  );
};

export default Navbar;
