import React from "react";
import { Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "../src/components/Navbar/Navbar";
import Sidebar from "../src/components/Sidebar/Sidebar";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Audit from "./pages/Audit/Audit";
import DailyReport from "./pages/DailyReport/DailyReport";
// import Login from "./components/Login/Login";
import Notification from "./pages/Notification/Notification";
import InternList from "./pages/Internmanagement/InternList";
import InternDetail from "./pages/Internmanagement/InternDetail";
import Profile from "./pages/Profile/Profile";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import MainLayout from "./feature/MainLayout/MainLayout";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route
              element={
                <ProtectedRoute>
                  {" "}
                  <MainLayout />
                </ProtectedRoute>
              }
            /> */}

      <Route element={<Sidebar />}>
        <Route path="*" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dailyreport" element={<DailyReport />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/interns" element={<InternList />} />
        <Route path="/interns/:id" element={<InternDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
