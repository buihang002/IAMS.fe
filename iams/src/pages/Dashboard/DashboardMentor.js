import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const DashboardMentor = () => {
  return (
    <div>
      <div>Dashboard Mentor</div>
      <section>
        <p>Total number of students:</p>
        <p>Total number of projects:</p>
      </section>
    </div>
  );
};

export default DashboardMentor;
