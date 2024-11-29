import React, { useState, useEffect } from "react";
import AuditID from "../Audit/Mentor/AuditID";
import AuditResult from "../Audit/Mentor/AuditResult";
import AuditInformation from "./Mentor/AuditInfor";

const Audit = () => {
  const [activeTab, setActiveTab] = useState("id");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    setCurrentDate(
      today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header container */}
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold ">AUDIT MANAGEMENT</h1>
        <p className="text-gray-600  text-end">
          <p className="text-xl font-bold">To Day</p> <p>{currentDate}</p>
        </p>{" "}
        {/* Ngày hiện tại */}
      </div>

      <p className="text-gray-600 mb-6">
        View all information about audit management
      </p>
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 ${
            activeTab === "id"
              ? "text-purple-700 bg-purple-100 font-bold border-b-2 rounded border-purple-500"
              : "text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-800"
          }`}
          onClick={() => setActiveTab("id")}
        >
          Audit ID
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "details"
              ? "text-purple-700 bg-purple-100 font-bold border-b-2 rounded border-purple-500"
              : "text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-800"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Audit Details
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "result"
              ? "text-purple-700 bg-purple-100 font-bold border-b-2 rounded border-purple-500"
              : "text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-800"
          }`}
          onClick={() => setActiveTab("result")}
        >
          Audit Result
        </button>
      </div>

      {/* Nội dung hiển thị */}
      <div className="mt-4">
        {activeTab === "id" && <AuditID />}
        {activeTab === "details" && <AuditInformation />}
        {activeTab === "result" && <AuditResult />}
      </div>
    </div>
  );
};

export default Audit;
