import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardAdmin() {
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <h3 className="mb-4">Dashboard ผู้ดูแล</h3>

          <div className="card shadow">
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>เลขที่</th>
                    <th>ชื่อนักเรียน</th>
                    <th>ประเภท</th>
                    <th>สถานะ</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>001</td>
                    <td>สมชาย ใจดี</td>
                    <td>ลาเรียน</td>
                    <td>
                      <span className="badge bg-warning">
                        รอดำเนินการ
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-success btn-sm me-2">
                        อนุมัติ
                      </button>
                      <button className="btn btn-danger btn-sm">
                        ปฏิเสธ
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}