import React, { useState } from "react";
import AuditID from "../Audit/Mentor/AuditID";
import AuditResult from "../Audit/Mentor/AuditResult";

const Audit = () => {
  const [activeTab, setActiveTab] = useState("id");

  return (
    <div className="p-4">
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 ${
            activeTab === "id"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("id")}
        >
          Audit ID
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "result"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("result")}
        >
          Audit Result
        </button>
      </div>

      {/* Nội dung hiển thị */}
      <div className="mt-4">
        {activeTab === "id" && <AuditID />}
        {activeTab === "result" && <AuditResult />}
      </div>
    </div>
  );
};

export default Audit;
