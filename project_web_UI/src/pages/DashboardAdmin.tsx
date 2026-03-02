import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

export default function DashboardAdmin() {

  const requests = [
    { id: 1, student: "Somchai", type: "ลาเรียน", status: "รอดำเนินการ" },
    { id: 2, student: "Anan", type: "ขอเอกสาร", status: "อนุมัติแล้ว" }
  ];

  const approved = requests.filter(r => r.status === "อนุมัติแล้ว").length;
  const pending = requests.filter(r => r.status === "รอดำเนินการ").length;

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          <div className="gradient-header mb-4">
            <h3 className="fw-bold">Dashboard ผู้ดูแล</h3>
            <p className="mb-0">ภาพรวมคำร้องทั้งหมด</p>
          </div>

          <div className="row g-3 mb-4">

            <div className="col-6 col-md-3">
              <div className="card shadow dashboard-card">
                <div className="card-body">
                  <h6 className="text-muted">ทั้งหมด</h6>
                  <h3>{requests.length}</h3>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card shadow dashboard-card">
                <div className="card-body">
                  <h6 className="text-muted">อนุมัติแล้ว</h6>
                  <h3 className="text-success">{approved}</h3>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card shadow dashboard-card">
                <div className="card-body">
                  <h6 className="text-muted">รอดำเนินการ</h6>
                  <h3 className="text-warning">{pending}</h3>
                </div>
              </div>
            </div>

          </div>

          <div className="card shadow border-0 rounded-4">
            <div className="card-body">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>นักเรียน</th>
                    <th>ประเภท</th>
                    <th>สถานะ</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(r => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{r.student}</td>
                      <td>{r.type}</td>
                      <td>
                        <span className={`badge ${
                          r.status === "อนุมัติแล้ว"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td>
                        <Link to={`/request/${r.id}`} className="btn btn-sm btn-primary">
                          ดู
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}