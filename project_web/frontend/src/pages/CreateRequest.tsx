import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function CreateRequest() {
  const navigate = useNavigate();

  const [type, setType] = useState("ลาเรียน");
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!detail.trim()) {
      alert("กรุณากรอกรายละเอียด");
      return;
    }

    try {
      setLoading(true);

      await API.post("/requests", {
        type,
        detail
      });

      alert("ส่งคำร้องสำเร็จ ✅");
      navigate("/student");

    } catch (error) {
      alert("เกิดข้อผิดพลาด ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <div className="mb-4">
            <h3 className="fw-bold">📝 ส่งคำร้อง</h3>
            <p className="text-muted">กรอกข้อมูลคำร้องของคุณ</p>
          </div>

          <div className="card shadow col-12 col-md-6">
            <div className="card-body">

              <div className="mb-3">
                <label className="form-label">ประเภทคำร้อง</label>
                <select
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="ลาเรียน">ลาเรียน</option>
                  <option value="ขอเอกสาร">ขอเอกสาร</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">รายละเอียด</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "กำลังส่ง..." : "ส่งคำร้อง"}
              </button>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}