import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

export default function DashboardStudent() {

  const requests = [
    { id: 1, type: "ลาเรียน", date: "01/02/66", status: "รอดำเนินการ" },
    { id: 2, type: "ขอเอกสาร", date: "05/02/66", status: "อนุมัติแล้ว" }
  ];

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <h3 className="mb-4">Dashboard นักเรียน</h3>

          {/* Summary */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-4">
              <div className="card text-bg-primary shadow">
                <div className="card-body">
                  <h6>คำร้องทั้งหมด</h6>
                  <h3>{requests.length}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Desktop Table ===== */}
          <div className="d-none d-md-block">
            <div className="card shadow">
              <div className="card-body">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>เลขที่</th>
                      <th>ประเภท</th>
                      <th>วันที่</th>
                      <th>สถานะ</th>
                      <th>ดู</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((r) => (
                      <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.type}</td>
                        <td>{r.date}</td>
                        <td>
                          <span className="badge bg-warning">
                            {r.status}
                          </span>
                        </td>
                        <td>
                          <Link to={`/request/${r.id}`} className="btn btn-sm btn-info">
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

          {/* ===== Mobile Card Layout ===== */}
          <div className="d-md-none">
            {requests.map((r) => (
              <div className="card shadow mb-3" key={r.id}>
                <div className="card-body">
                  <h6 className="fw-bold">คำร้อง #{r.id}</h6>
                  <p className="mb-1"><strong>ประเภท:</strong> {r.type}</p>
                  <p className="mb-1"><strong>วันที่:</strong> {r.date}</p>
                  <p>
                    <strong>สถานะ:</strong>{" "}
                    <span className="badge bg-warning">
                      {r.status}
                    </span>
                  </p>
                  <Link to={`/request/${r.id}`} className="btn btn-primary w-100">
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}