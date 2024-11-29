// import React from "react";
// import { Router, Routes, Route, useLocation } from "react-router-dom";

// import Navbar from "../src/components/Navbar/Navbar";
// import Sidebar from "../src/components/Sidebar/Sidebar";
// import "./App.css";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import Audit from "./pages/Audit/Audit";
// import DailyReport from "./pages/DailyReport/DailyReport";
// // import Login from "./components/Login/Login";
// import Notification from "./pages/Notification/Notification";
// import InternList from "./pages/Internmanagement/InternList";
// import InternDetail from "./pages/Internmanagement/InternDetail";
// import Profile from "./pages/Profile/Profile";
// // import Register from "./components/Authentication/Register";
// import Login from "./components/Authentication/Login";
// import CreateInternForm from "./pages/Internmanagement/CreateInternForm";
// // import MainLayout from "./feature/MainLayout/MainLayout";
// import ProtectedRoute from "./components/Authentication/ProtectedRoute";
// import { AuthProvider } from "./components/Authentication/AuthContext";
// import CreateAuditForm from "./pages/Audit/CreateAuditForm";
// import AuditDetail from "./pages/Audit/AuditDetails";
// import MainLayout from "./components/MainLayout/MainLayout";
// import { Navigate } from "react-router-dom";
// import AuditListID from "./pages/Audit/Mentor/AuditID";
// import AuditResult from "./pages/Audit/Mentor/AuditResult";
// import AuditResultDetails from "./pages/Audit/Mentor/AuditResultDetails";
// import Unauthorized from "./pages/Unauthorized/Unauthorized";
// function App() {
//   return (
//     <>
//       {/* <AuthProvider> */}
//       <Routes>
//         {/* chính */}
//         <Route path="/" element={<Login />} />

// <Route element={<ProtectedRoute allowedRoles={['MENTOR']} />}>

//         <Route element={<ProtectedRoute allowedRoles={["mentor"]} />}>
//           {/* <Route path="/" element={<Dashboard />} /> */}
//         </Route>
//         <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
//           {/* <Route path="interns" element={<InternList />} /> */}
//         </Route>
//         {/* <Route path="/" element={<Dashboard />} /> */}
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/dailyreport" element={<DailyReport />} />
//         {/* <Route path="/audit" element={<Audit />} /> */}
//         <Route path="/notification" element={<Notification />} />
//         <Route path="/intern" element={<InternList />} />
//         <Route path="/audit" element={<Audit />} />
//         <Route path="/intern/profile/:id" element={<InternDetail />} />
//         <Route path="/intern/create-intern" element={<CreateInternForm />} />
//         <Route path="/create-audit" element={<CreateAuditForm />} />
//         <Route path="/audit/:id" element={<AuditDetail />} />
//         <Route path="/auditlistid" element={<AuditListID />} />
//         <Route path="/auditresult" element={<AuditResult />} />
//         <Route path="/audit-result/:id" element={<AuditResultDetails />} />
//         {/* </Route> */}
//         <Route path="*" element={<Unauthorized />} />
//       </Routes>
//       {/* </AuthProvider> */}
//     </>
//   );
// }

// export default App;
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

import Dashboard from "./pages/Dashboard/Dashboard";
import Audit from "./pages/Audit/Audit";
import DailyReport from "./pages/DailyReport/DailyReport";
import Notification from "./pages/Notification/Notification";
import InternList from "./pages/Internmanagement/InternList";
import InternDetail from "./pages/Internmanagement/InternDetail";
import Profile from "./pages/Profile/Profile";
import Login from "./components/Authentication/Login";
import CreateInternForm from "./pages/Internmanagement/CreateInternForm";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import { AuthProvider } from "./components/Authentication/AuthContext";
import CreateAuditForm from "./pages/Audit/CreateAuditForm";
import AuditDetail from "./pages/Audit/AuditDetails";
import MainLayout from "./components/MainLayout/MainLayout";
import { Navigate } from "react-router-dom";
import AuditListID from "./pages/Audit/Mentor/AuditID";
import AuditResult from "./pages/Audit/Mentor/AuditResult";
import AuditResultDetails from "./pages/Audit/Mentor/AuditResultDetails";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import DashboardMentor from "./pages/Dashboard/DashboardMentor";
import DashboardIntern from "./pages/Dashboard/DashboardIntern";
import AuditIntern from "./pages/AuditIntern/AuditIntern";
import AuditInternDetail from "./pages/AuditIntern/AuditInternDetail";
import AuditIdDetails from "./pages/Audit/Mentor/AuditIDDetails";
import AuditInternEvaluation from "./pages/Audit/Mentor/AuditInternEvaluation";
import AuditFormDetails from "./pages/Audit/Mentor/AuditFormDetails";
function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // State quản lý Sidebar
  const location = useLocation();
  const isLoginPage = location.pathname === "/"; // Xác định nếu đang ở trang đăng nhập

  // Hàm toggle trạng thái sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  // Reset trạng thái sidebar khi đăng xuất
  const resetSidebarState = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      {!isLoginPage && (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      {/* Content Area */}
      <div
        className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-16"} transition-all`}
      >
        {/* Navbar */}
        {!isLoginPage && (
          <Navbar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            resetSidebarState={resetSidebarState}
          />
        )}

        {/* Main Content */}
        <div className="pt-16 p-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* Routes for INTERN role */}
            <Route
              path="/dashboardintern"
              element={
                <ProtectedRoute allowedRoles={["INTERN"]}>
                  <DashboardIntern />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dailyreport"
              element={
                <ProtectedRoute allowedRoles={["INTERN"]}>
                  <DailyReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/audit"
              element={
                <ProtectedRoute allowedRoles={["INTERN", "MENTOR"]}>
                  <Audit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/auditintern"
              element={
                <ProtectedRoute allowedRoles={["INTERN"]}>
                  <AuditIntern />
                </ProtectedRoute>
              }
            />
            {/* Routes for MENTOR role */}
            <Route
              path="/dashboardmentor"
              element={
                <ProtectedRoute allowedRoles={["MENTOR"]}>
                  <DashboardMentor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/intern"
              element={
                <ProtectedRoute allowedRoles={["MENTOR"]}>
                  <InternList />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dailyreport" element={<DailyReport />} />
            {/* <Route path="/audit" element={<Audit />} /> */}
            <Route path="/notification" element={<Notification />} />
            <Route path="/intern" element={<InternList />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/intern/profile/:id" element={<InternDetail />} />{" "}
            <Route
              path="/intern/create-intern"
              element={<CreateInternForm />}
            />
            <Route path="/create-audit" element={<CreateAuditForm />} />
            {/* <Route path="/audit/:auditId/:id" element={<AuditIdDetails />} /> */}
            <Route path="/audit/:auditId" element={<AuditIdDetails />} />
            <Route path="/audit/id" element={<AuditListID />} />
            <Route
              path="/audit-result/intern/:id"
              element={<AuditResultDetails />}
            />
            <Route path="/audit-detail/:id" element={<AuditInternDetail />} />
            <Route
              path="/audit-intern/:id/evaluation"
              element={<AuditInternEvaluation />}
            />
            <Route
              path="/audit-form/audit-intern-form/:id"
              element={<AuditFormDetails />}
            />
            {/* Detail route */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
