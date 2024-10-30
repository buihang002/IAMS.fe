import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Dashboard from "../../pages/Dashboard/Dashboard";
import InternList from "../../pages/Internmanagement/InternList";

import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
