import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function CreateRequest() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <div className="gradient-header mb-4">
            <h3 className="fw-bold">📝 ส่งคำร้อง</h3>
            <p className="mb-0">กรอกข้อมูลคำร้องของคุณ</p>
          </div>

          <div className="card shadow col-12 col-md-6">
            <div className="card-body">

              <div className="mb-3">
                <label className="form-label">ประเภทคำร้อง</label>
                <select className="form-select">
                  <option>ลาเรียน</option>
                  <option>ขอเอกสาร</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">รายละเอียด</label>
                <textarea className="form-control" rows={4}></textarea>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/student")}
              >
                ส่งคำร้อง
              </button>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}