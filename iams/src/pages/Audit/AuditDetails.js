import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Card } from "react-bootstrap";

const AuditDetail = () => {
  // Lấy auditId từ URL
  const { auditId } = useParams();
  const [audit, setAudit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuditDetail = async () => {
      try {
        const response = await axios.get("data/db.json");
        const auditData = response.data.audits.find(
          (item) => item.id === auditId
        );

        if (auditData) {
          setAudit(auditData);
        } else {
          setError("Audit not found");
        }
      } catch (error) {
        setError("Error fetching audit details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditDetail();
  }, [auditId]); // Chạy lại useEffect khi auditId thay đổi

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-semibold mb-4">Audit Details</h2>
      {audit ? (
        <Card className="shadow-lg p-4">
          <Card.Body>
            <h4 className="text-2xl font-bold mb-2">Audit Information</h4>
            <p>
              <strong>ID:</strong> {audit.id}
            </p>
            <p>
              <strong>Date:</strong> {audit.date}
            </p>
            <p>
              <strong>Start Time:</strong> {audit.startTime}
            </p>
            <p>
              <strong>End Time:</strong> {audit.endTime}
            </p>
            <p>
              <strong>Participants:</strong> {audit.participants.join(", ")}
            </p>
            <Link to="/audit">
              <Button variant="primary" className="mt-4">
                Back to Audit List
              </Button>
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <p>No audit data found.</p>
      )}
    </div>
  );
};

export default AuditDetail;
