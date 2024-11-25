import React, { useEffect, useState } from "react";
import axios from "../../../utils/MyAxios";
import { useParams } from "react-router-dom";

const AuditItem = () => {
  const { id } = useParams();
  const [audit, setAudit] = useState(null);

  useEffect(() => {
    axios
      .get(`/audit/${id}`)
      .then((response) => {
        setAudit(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the audit:", error);
      });
  }, [id]);

  if (!audit) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Audit Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold">Audit ID: {audit.auditId}</h3>
        <p className="text-lg mt-2">
          <strong>Mentor ID:</strong> {audit.mentorId}
        </p>
        <p className="text-lg mt-2">
          <strong>Evaluation Period:</strong> {audit.evaluationPeriod}
        </p>
        <p className="text-lg mt-2">
          <strong>Date:</strong> {audit.date}
        </p>
        <p className="text-lg mt-2">
          <strong>Additional Details:</strong>
        </p>
        <ul className="list-disc ml-6"></ul>
      </div>
    </div>
  );
};

export default AuditItem;
