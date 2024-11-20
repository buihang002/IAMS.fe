import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import MyAxios from "../../utils/MyAxios";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const fetchUsername = () => {
    MyAxios.get("users/me")
      .then((response) => {
        const nameData = response.data.data;
        setUsername(nameData.fullName);
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
        setUsername("Error");
      });
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("loggingUser");
    // navigate("/login");
  }

  // const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));

  return (
    <div>
      <div className="flex ">
        {/* Sidebar */}
        <div
          className={`bg-slate-950 text-white p-4 ${
            isOpen ? "w-64" : "w-16"
          } h-screen fixed top-0 left-0 overflow-y-auto z-50 transition-width duration-300`}
        >
          <div className="text-center text-2xl mb-4 font-bold bg-gradient-to-r from-blue-500  to-white bg-clip-text text-transparent hover:from-blue-400 hover:via-green-500 hover:to-yellow-500 active:from-indigo-600 active:via-cyan-500 active:to-teal-400 transform transition-transform duration-300 ease-in-out ">
            IAMS
          </div>

          <div className="role">
            {/* <span className="role-box">{loggingUser?.role}</span> */}
          </div>
          <ul className="list-none p-0 m-0  ">
            <li className="my-2 cursor-pointer text-lg p-2 rounded transition duration-300 ease-in-out text-gray-500 bg-slate-200 hover:bg-gray-300 hover:text-white border hover:border-white border-gray-400"></li>
            <div className="text-xs font-bold text-gray-500 pt-7">
              MAIN MENU
            </div>

            {/* <li className="my-2 cursor-pointer text-lg p-2 transition duration-300 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white">
              <Link to="/" className="flex items-center">
                <i className={`bi bi-list-stars ${isOpen ? "mr-2" : ""}`} />
                {isOpen && "Dashboard"}
              </Link>
            </li> */}
            {/* <li className="my-2 cursor-pointer text-lg p-2 transition duration-300 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white">
              <Link to="/notification" className="flex items-center">
                <i className={`bi bi-bell ${isOpen ? "mr-2" : ""}`} />
                {isOpen && "Notifications"}
              </Link>
            </li> */}
            {/* {loggingUser?.role === "intern" && ( */}
            <div className="ml-2 mt-4">
              <li className="text-lg p-2 font-bold bg-gradient-to-br from-white  to-white bg-clip-text text-transparent hover:from-blue-500  hover:to-white active:from-indigo-600 active:via-cyan-500 active:to-teal-400 transform transition-transform duration-300 ease-in-out  hover:scale-110 active:scale-90 focus:scale-120">
                <Link to="/dailyreport" className="flex items-center ">
                  <i className={`bi bi-calendar3 ${isOpen ? "mr-2" : ""}`} />
                  {isOpen && "Daily Report"}
                </Link>
              </li>
              {/* )} */}
              {/* {loggingUser?.role === "mentor" && ( */}
              <li className="mt-3 text-lg p-2 font-bold bg-gradient-to-br from-white  to-white bg-clip-text text-transparent hover:from-blue-500  hover:to-white active:from-indigo-600 active:via-cyan-500 active:to-teal-400 transform transition-transform duration-300 ease-in-out  hover:scale-110 active:scale-90 focus:scale-120">
                <Link to="/audit" className="flex items-center">
                  <i className={`bi bi-bookmarks ${isOpen ? "mr-2" : ""}`} />
                  {isOpen && "Audit"}
                </Link>
              </li>
              {/* )} */}
              {/* {loggingUser?.role === "mentor" && ( */}
              <li className=" mt-3 text-lg p-2 font-bold bg-gradient-to-br from-white  to-white bg-clip-text text-transparent hover:from-blue-500  hover:to-white active:from-indigo-600 active:via-cyan-500 active:to-teal-400 transform transition-transform duration-300 ease-in-out  hover:scale-110 active:scale-90 focus:scale-120">
                <Link to="/intern" className="flex items-center">
                  {isOpen ? (
                    <>
                      <i className="bi bi-people-fill mr-2"></i> Intern
                      Management
                    </>
                  ) : (
                    <i className="bi bi-people-fill"></i>
                  )}
                </Link>
              </li>
              {/* )} */}
            </div>
          </ul>

          <div className="text-xs font-bold text-gray-500 mt-5">OTHER</div>
          {/* <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 mt-2"
          >
            Logout
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
