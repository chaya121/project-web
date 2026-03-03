import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function RequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          
          {/* ปุ่มกลับ */}
          <button
            className="btn btn-outline-secondary mb-3"
            onClick={() => navigate("/admin")}
          >
            ← กลับหน้า Dashboard
          </button>

          <div className="card shadow col-12 col-md-6">
            <div className="card-body">
              <h3 className="mb-4">รายละเอียดคำร้อง</h3>

              <p><strong>เลขที่คำร้อง:</strong> {id}</p>
              <p><strong>ประเภท:</strong> ลาเรียน</p>
              <p>
                <strong>สถานะ:</strong>{" "}
                <span className="badge bg-warning">
                  รอดำเนินการ
                </span>
              </p>

              <div className="mt-4 d-flex gap-2">
                <button className="btn btn-success">
                  อนุมัติ
                </button>

                <button className="btn btn-danger">
                  ปฏิเสธ
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}