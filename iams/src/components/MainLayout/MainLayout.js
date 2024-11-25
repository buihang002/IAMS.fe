// import React from "react";
// import Sidebar from "../Sidebar/Sidebar";
// import { Outlet } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";

// const MainLayout = () => {
//   const [isOpen, setIsOpen] = React.useState(true);
//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <div style={{ display: "flex" }}>
//       <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
//       <Sidebar />
//       <div className={`flex-grow p-4 ${isOpen ? "ml-64" : "ml-16"}`}>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default MainLayout;
import React from "react";
import Sidebar from "../Sidebar/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 bg-gray-100">
        {children} {/* Nội dung trang */}
      </div>
    </div>
  );
}
