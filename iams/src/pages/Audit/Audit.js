import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuditPage = () => {
  const [activeTab, setActiveTab] = useState("auditID");

  return (
    <div className="max-w-4xl mx-auto p-4 mt-11">
      {/* Tab buttons */}
      <div className="flex space-x-4 mb-6 border-b-2 border-gray-100">
        <div className=" p-4">
          <button
            className={`px-4 py-2 font-semibold rounded hover:bg-blue-400`}
            onClick={() => setActiveTab("auditID")}
          >
            Audit ID
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded  hover:bg-blue-400`}
            onClick={() => setActiveTab("auditResult")}
          >
            Audit Result
          </button>
        </div>
      </div>
      {/* Content */}
      <div className=" pt-2 px-6 pb-6">
        {activeTab === "auditID" && <AuditID />}
        {activeTab === "auditResult" && <AuditResult />}
      </div>
    </div>
  );
};


const AuditID = () => (
  <div>
    <h2 className="text-2xl font-bold mb-2">Audit ID</h2>
    <div>
      <Link to="/create-audit">Create </Link>
    </div>
  </div>
);

const AuditResult = () => (
  <div>
    <h2 className="text-2xl font-bold mb-2">Audit Result</h2>
    <p className="text-gray-700">Đây là nội dung của Audit Result.</p>
  </div>
);

export default AuditPage;
