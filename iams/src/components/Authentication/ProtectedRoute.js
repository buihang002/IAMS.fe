// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// // import MainLayout from "../MainLayout/MainLayout";
// // const ProtectedRoute = () => {
// //   const user = JSON.parse(localStorage.getItem("user"));

// //   if (!user) {
// //     return <Navigate to="/login" replace />;
// //   }

// //   // if (loggedInUser && allowedRoles.includes(loggedInUser.role)) {
// //   //   return <MainLayout />;
// //   // } else {
// //   //   return <Navigate to="/login" />;
// //   // }
// // };

// // export default ProtectedRoute;
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return allowedRoles.includes(user.role) ? (
//     children
//   ) : (
//     <Navigate to="/" replace />
//   );
// };
// export default ProtectedRoute;
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
