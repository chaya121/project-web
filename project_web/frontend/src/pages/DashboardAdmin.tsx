import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatusBadge from "../components/StatusBadge";
import { useEffect, useState } from "react";
import API from "../api";

export default function DashboardAdmin() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/requests").then((res) => {
      setRequests(res.data);
    });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    console.log("CLICKED:", id, status); // 👈 เพิ่มบรรทัดนี้

    await API.put(`/requests/${id}`, { status });

    const res = await API.get("/requests");
    setRequests(res.data);
  };

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <div className="gradient-header mb-4">
            <h3>🛠 Dashboard ผู้ดูแลระบบ</h3>
          </div>

          <table className="table table-bordered bg-white shadow">
            <thead>
              <tr>
                <th>นักศึกษา</th>
                <th>ประเภท</th>
                <th>สถานะ</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req: any) => (
                <tr key={req._id}>
                  <td>{req.user?.name}</td>
                  <td>{req.type}</td>
                  <td><StatusBadge status={req.status} /></td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => updateStatus(req._id, "approved")}
                    >
                      อนุมัติ
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => updateStatus(req._id, "rejected")}
                    >
                      ปฏิเสธ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
}