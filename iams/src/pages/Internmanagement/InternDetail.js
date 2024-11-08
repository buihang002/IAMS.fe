import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const InternDetail = ({ isOpen }) => {
  const { id } = useParams();
  const [intern, setIntern] = useState(null);

  useEffect(() => {
    const fetchIntern = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/interns/${id}`); // Đường dẫn lấy thông tin chi tiết
        setIntern(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin thực tập sinh:", error);
      }
    };

    fetchIntern();
  }, [id]);

  if (!intern) return <div className="text-center py-4">Loading...</div>; // Thông báo khi đang tải

  return (
    <div className={` mt-20  mx-auto`}>
      <Link
        to="/interns"
        className="text-gray-800 ml-3 font-semibold border border-gray-200 p-2 rounded bg-gray-300 hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out underline-offset-4 hover:no-underline"
      >
        <i className="bi bi-skip-backward-fill"></i> Back
      </Link>

      <div className=" mt-6 pb-8 px-8 w-full  ">
        <div className=" border border-gray-300 rounded bg-white pl-8 pr-8 shadow">
          <div className="flex flex-row items-center justify-start">
            <img
              src={intern.avatar}
              alt="User Avatar"
              className="w-28  h-28 p-3 mb-3 mt-3 rounded-full object-cover "
            />
            <div>
              <p className="text-lg font-semibold  text-gray-950">
                {intern.fullName}
              </p>

              <p className="text-sm text-gray-500">{intern.account}</p>
            </div>
          </div>
        </div>
        <div className=" space-x-4 mt-4">
          <div className="border border-gray-200 p-2 rounded shadow">
            <div className="grid grid-cols-2 gap-5 p-5">
              {/* Cột bên trái */}
              <div>
                <div className="mb-4">
                  <p className="font-semibold">Name:</p>
                  <p className="ml-2 border border-gray-200 p-2 rounded">
                    {intern.fullName}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Account:</p>
                  <p className="ml-2 border border-gray-200 p-2 rounded">
                    {intern.account}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Gender:</p>
                  <p className="ml-2 border border-gray-200 p-2 rounded">
                    {intern.gender}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Date of Birth:</p>
                  <p className="ml-2 border border-gray-200 p-2 rounded">
                    {intern.dob}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Phone:</p>
                  <p className="ml-2 border border-gray-200 p-2 rounded">
                    {intern.phone}
                  </p>
                </div>
              </div>

              {/* Cột bên phải */}
              <div>
                <div className="mb-4">
                  <p className="font-semibold">Address:</p>
                  <p className="ml-2 border border-gray-200 p-2 rounded">
                    {intern.address}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Role:</p>
                  <p className="ml-2 border border-gray-200 p-2 rounded">
                    {intern.role}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Social Num:</p>
                  <p className="ml-2 border border-gray-200 p-2 rounded">
                    {intern.socialNum}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Status:</p>
                  <p className="ml-2 border border-gray-200 p-2 rounded">
                    {intern.status === "Active" ? (
                      <span className="flex items-center">
                        <span className="inline-block w-3 h-3 mr-2 bg-green-500 rounded-full"></span>
                        <span className="text-green-600 font-semibold">
                          Active
                        </span>
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <span className="inline-block w-3 h-3 mr-2 bg-red-500 rounded-full"></span>
                        <span className="text-red-600 font-semibold">
                          Deactive
                        </span>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternDetail;
