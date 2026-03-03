import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatusBadge from "../components/StatusBadge";
import { useEffect, useState } from "react";
import API from "../api";

export default function DashboardStudent() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/requests/my").then((res) => {
      setRequests(res.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <div className="gradient-header mb-4">
            <h3>📋 Dashboard นักศึกษา</h3>
            <p>รายการคำร้องของคุณ</p>
          </div>

          <div className="row">
            {requests.map((req: any) => (
              <div className="col-md-4 mb-4" key={req._id}>
                <div className="card shadow p-3">
                  <h5>{req.type}</h5>
                  <p className="text-muted">{req.detail}</p>
                  <StatusBadge status={req.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}