// import React, { useState, useEffect } from "react";
// import { Link, Outlet } from "react-router-dom";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import Navbar from "../Navbar/Navbar";
// import { useNavigate } from "react-router-dom";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true); // Trạng thái mở/đóng sidebar
//   const navigate = useNavigate();
//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const [user, setUser] = useState({
//     name: "John Doe",
//     avatar:
//       "https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg?w=740", // URL hình ảnh cho avatar
//     email: "johndoe@example.com",
//     phone: "123-456-7890",
//     address: "123 Main St, Springfield, USA",
//     birthday: "1990-01-01",
//     jobTitle: "Software Engineer",
//     company: "Tech Corp",
//     role: "Mentor", // Thêm role
//     status: "Active", // Thêm status
//   });

//   // useEffect(() => {
//   //   // Giả lập API call để lấy thông tin người dùng
//   //   const fetchUserData = async () => {
//   //     // const response = await fetch('https://api.example.com/user');
//   //     // const data = await response.json();
//   //     // setUser(data);
//   //   };
//   //   fetchUserData();
//   // }, []);
//   const handleLogout = () => {
//     // Xoá token từ localStorage
//     localStorage.removeItem("authToken");
//     // Chuyển hướng người dùng đến trang đăng nhập
//     navigate("/login");
//   };
//   return (
//     <div>
//       <div
//         className={`bg-slate-950 text-white items-center p-4 ${
//           isOpen ? "w-64" : "w-16"
//         } h-screen fixed top-0 left-0 overflow-y-auto z-50 transition-width duration-300`}
//       >
//         <div className="text-2xl font-bold mb-5   text-center  pb-4">IAMS</div>

//         <ul className="list-none p-0 m-0">
//           <li className="my-2 cursor-pointer text-lg p-2 rounded transition duration-300 ease-in-out text-gray-500 bg-slate-200 hover:bg-gray-300 hover:text-white border hover:border-white border-gray-400 ">
//             <Link to="/profile" className="flex px-2 items-center">
//               <img
//                 src={user.avatar}
//                 alt="User Avatar"
//                 className="w-9 h-9 rounded-full object-cover"
//               />
//               <div className="  pl-4 text-start space-y-1">
//                 <p className="text-lg font-semibold text-gray-800">
//                   {user.name}
//                 </p>
//                 <div className="flex items-center">
//                   <p className="text-sm text-gray-500">{user.role}</p>
//                   {/* Hiển thị role */}
//                 </div>
//               </div>

//               {/* ---------------------------- */}
//             </Link>
//           </li>
//           <div className="text-xs font-bold text-gray-500 pt-7"> MAIN MENU</div>

//           <li className="my-2 cursor-pointer text-lg p-2  transition duration-300 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white ">
//             <Link to="/dashboard" className="flex items-center">
//               {isOpen ? (
//                 <>
//                   <i className="bi bi-list-stars mr-2"></i> Dashboard
//                 </>
//               ) : (
//                 <i className="bi bi-list-stars"></i>
//               )}
//             </Link>
//           </li>

//           <li className="my-2 cursor-pointer text-lg p-2  transition duration-300 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white">
//             <Link to="/notification" className="flex items-center">
//               {isOpen ? (
//                 <>
//                   <i className="bi bi-bell mr-2"></i> Notifications
//                 </>
//               ) : (
//                 <i className="bi bi-bell"></i>
//               )}
//             </Link>
//           </li>

//           <li className="my-2 cursor-pointer text-lg p-2  transition duration-300 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white">
//             <Link to="/dailyreport" className="flex items-center">
//               {isOpen ? (
//                 <>
//                   <i className="bi bi-calendar3 mr-2"></i> Daily Report
//                 </>
//               ) : (
//                 <i className="bi bi-calendar3"></i>
//               )}
//             </Link>
//           </li>

//           <li className="my-2 cursor-pointer text-lg p-2  transition duration-300 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white">
//             <Link to="/audit" className="flex items-center">
//               {isOpen ? (
//                 <>
//                   <i className="bi bi-bookmarks mr-2"></i> Audit
//                 </>
//               ) : (
//                 <i className="bi bi-bookmarks"></i>
//               )}
//             </Link>
//           </li>

//           <li className="my-2 cursor-pointer text-lg p-2  transition duration-300 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white">
//             <Link to="/interns" className="flex items-center">
//               {isOpen ? (
//                 <>
//                   <i className="bi bi-bookmarks mr-2"></i> Intern Management
//                 </>
//               ) : (
//                 <i className="bi bi-bookmarks"></i>
//               )}
//             </Link>
//           </li>
//         </ul>
//         <div className="text-xs font-bold text-gray-500 mt-5">ORTHER</div>
//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>

//       <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
//       <Outlet />
//     </div>
//   );
// };

// export default Sidebar;
// import React, { useState, useEffect } from "react";
// import { Link, Outlet } from "react-router-dom";
// import "bootstrap-icons/font/bootstrap-icons.css";
// // import Navbar from "../Navbar/Navbar";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true); // Trạng thái mở/đóng sidebar
//   const navigate = useNavigate();
//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const [user, setUser] = useState({
//     name: "John Doe",
//     avatar:
//       "https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg?w=740", // URL hình ảnh cho avatar
//     email: "johndoe@example.com",
//     phone: "123-456-7890",
//     address: "123 Main St, Springfield, USA",
//     birthday: "1990-01-01",
//     jobTitle: "Software Engineer",
//     company: "Tech Corp",
//     role: "Mentor", // Thêm role
//     status: "Active", // Thêm status
//   });

//   // useEffect(() => {
//   //   // Giả lập API call để lấy thông tin người dùng
//   //   const fetchUserData = async () => {
//   //     // const response = await fetch('https://api.example.com/user');
//   //     // const data = await response.json();
//   //     // setUser(data);
//   //   };
//   //   fetchUserData();
//   // }, []);
//   const handleLogout = () => {
//     // Xoá token từ localStorage
//     localStorage.removeItem("authToken");
//     // Chuyển hướng người dùng đến trang đăng nhập
//     navigate("/login");
//   };
//   return (
//     <div>
//       <header>
//         <div
//           className={`bg-slate-950 text-white items-center p-4 h-screen fixed top-0 left-0 overflow-y-auto z-50 transition-width duration-300`}
//         >
//           <div className="text-2xl font-bold mb-5   text-center  pb-4">
//             IAMS
//           </div>

//           <ul className="list-none p-0 m-0">
//             <li className="my-2 cursor-pointer text-lg p-2 rounded transition duration-300 ease-in-out text-gray-500 bg-slate-200 hover:bg-gray-300 hover:text-white border hover:border-white border-gray-400 ">
//               <Link to="/profile" className="flex px-2 items-center">
//                 <img
//                   src={user.avatar}
//                   alt="User Avatar"
//                   className="w-9 h-9 rounded-full object-cover"
//                 />
//                 <div className="  pl-4 text-start space-y-1">
//                   <p className="text-lg font-semibold text-gray-800">
//                     {user.name}
//                   </p>
//                   <div className="flex items-center">
//                     <p className="text-sm text-gray-500">{user.role}</p>
//                     {/* Hiển thị role */}
//                   </div>
//                 </div>

//                 {/* ---------------------------- */}
//               </Link>
//             </li>
//             <div className="text-xs font-bold text-gray-500 pt-7">
//               {" "}
//               MAIN MENU
//             </div>

//             <li className="my-2 cursor-pointer text-lg p-2  transition duration-300 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white ">
//               <Link to="/dashboard" className="flex items-center">
//                 <i className="bi bi-list-stars mr-2"></i> Dashboard
//               </Link>
//             </li>

//             <li className="my-2 cursor-pointer text-lg p-2  transition duration-300 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white">
//               <Link to="/notification" className="flex items-center">
//                 <i className="bi bi-bell mr-2"></i> Notifications
//               </Link>
//             </li>
//           </ul>
//           <div className="text-xs font-bold text-gray-500 mt-5">ORTHER</div>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//         <Navbar />
//         <Outlet
//         {/* <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} /> */}
//       </header>
//       <main></main>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../Navbar/Navbar";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [user, setUser] = useState({
    name: "John Doe",
    avatar:
      "https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg?w=740",
    role: "Mentor",
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`bg-slate-950 text-white p-4 ${
            isOpen ? "w-64" : "w-16"
          } h-screen fixed top-0 left-0 overflow-y-auto z-50 transition-width duration-300`}
        >
          <div className="text-2xl font-bold mb-5 text-center pb-4">IAMS</div>

          <ul className="list-none p-0 m-0">
            <li className="my-2 cursor-pointer text-lg p-2 rounded transition duration-300 ease-in-out text-gray-500 bg-slate-200 hover:bg-gray-300 hover:text-white border hover:border-white border-gray-400">
              <Link to="/profile" className="flex px-2 items-center">
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full object-cover"
                />
                {isOpen && (
                  <div className="pl-4 text-start space-y-1">
                    <p className="text-lg font-semibold text-gray-800">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                )}
              </Link>
            </li>

            <div className="text-xs font-bold text-gray-500 pt-7">
              MAIN MENU
            </div>

            <li className="my-2 cursor-pointer text-lg p-2 transition duration-300 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white">
              <Link to="/dashboard" className="flex items-center">
                <i className={`bi bi-list-stars ${isOpen ? "mr-2" : ""}`} />
                {isOpen && "Dashboard"}
              </Link>
            </li>

            <li className="my-2 cursor-pointer text-lg p-2 transition duration-300 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white">
              <Link to="/notification" className="flex items-center">
                <i className={`bi bi-bell ${isOpen ? "mr-2" : ""}`} />
                {isOpen && "Notifications"}
              </Link>
            </li>

            <li className="my-2 cursor-pointer text-lg p-2 transition duration-300 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white">
              <Link to="/dailyreport" className="flex items-center">
                <i className={`bi bi-calendar3 ${isOpen ? "mr-2" : ""}`} />
                {isOpen && "Daily Report"}
              </Link>
            </li>

            <li className="my-2 cursor-pointer text-lg p-2 transition duration-300 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white">
              <Link to="/audit" className="flex items-center">
                <i className={`bi bi-bookmarks ${isOpen ? "mr-2" : ""}`} />
                {isOpen && "Audit"}
              </Link>
            </li>

            <li className="my-2 cursor-pointer text-lg p-2  transition duration-300 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white">
              <Link to="/interns" className="flex items-center">
                {isOpen ? (
                  <>
                    <i className="bi bi-bookmarks mr-2"></i> Intern Management
                  </>
                ) : (
                  <i className="bi bi-bookmarks"></i>
                )}
              </Link>
            </li>
          </ul>

          <div className="text-xs font-bold text-gray-500 mt-5">OTHER</div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 mt-2"
          >
            Logout
          </button>
        </div>

        {/* Nội dung con hiển thị qua Outlet */}
        <div className={`flex-grow p-4 ${isOpen ? "ml-64" : "ml-16"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
