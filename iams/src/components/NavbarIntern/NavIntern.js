import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
// import { getPageName } from "../../utils/pageName";

const Navbar = () => {
  // const location = useLocation();
  // const pageName = getPageName(location.pathname);

  return (
    <div>
      <nav
        className={`p-5 bg-white flex justify-start items-center fixed top-0 transition-all duration-300 
     right-0 left-0 z-50 border-b border-gray-300`}
      >
        <Link to="/intern">Intern</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
