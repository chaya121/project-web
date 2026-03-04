import { useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function CreateRequest() {
  const [type, setType] = useState("ลาเรียน");
  const [selectedDoc, setSelectedDoc] = useState("");
  const [detail, setDetail] = useState("");

  const documentCategories = {
    "🎓 การศึกษา": [
      "หนังสือรับรองการเป็นนักศึกษา",
      "ทรานสคริปต์",
      "ใบรับรองผลการเรียน",
      "ใบรับรองสถานภาพนักศึกษา",
      "ใบรับรองจบการศึกษา",
      "ใบรับรองเกรดเฉลี่ย"
    ],
    "💼 ฝึกงาน": [
      "หนังสือฝึกงาน",
      "หนังสือรับรองฝึกงาน",
      "หนังสือส่งตัวฝึกงาน",
      "หนังสือประเมินผลฝึกงาน"
    ],
    "📄 ทั่วไป": [
      "สำเนาทะเบียนนักศึกษา",
      "ใบคำร้องทั่วไป",
      "หนังสือรับรองความประพฤติ"
    ]
  };

  const submit = async () => {
    if (type === "ขอเอกสาร" && !selectedDoc) {
      alert("กรุณาเลือกเอกสาร");
      return;
    }

    if (type === "ลาเรียน" && !detail) {
      alert("กรุณากรอกรายละเอียด");
      return;
    }

    await API.post("/requests", {
      type,
      detail: type === "ขอเอกสาร" ? selectedDoc : detail
    });

    alert("ส่งคำร้องสำเร็จ");
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />

        <div className="container p-4">
          <div className="card shadow-lg p-4 border-0 rounded-4">

            <h3 className="fw-bold mb-4">📄 สร้างคำร้อง</h3>

            {/* ประเภทคำร้อง */}
            <div className="mb-4">
              <label className="form-label fw-semibold">ประเภทคำร้อง</label>
              <select
                className="form-select form-select-lg"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setSelectedDoc("");
                }}
              >
                <option value="ลาเรียน">ลาเรียน</option>
                <option value="ขอเอกสาร">ขอเอกสาร</option>
              </select>
            </div>

            {/* หมวดเอกสาร */}
            {type === "ขอเอกสาร" && (
              <div className="mb-4">
                {Object.entries(documentCategories).map(
                  ([category, docs], index) => (
                    <div key={index} className="mb-4">

                      <h5 className="fw-bold mb-3">{category}</h5>

                      <div className="row">
                        {docs.map((doc, i) => (
                          <div className="col-md-4 mb-3" key={i}>
                            <div
                              className={`card p-3 shadow-sm rounded-3 ${selectedDoc === doc
                                  ? "border-primary border-3"
                                  : ""
                                }`}
                              style={{ cursor: "pointer" }}
                              onClick={() => setSelectedDoc(doc)}
                            >
                              <p className="mb-0">{doc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  )
                )}
              </div>
            )}

            {/* ลาเรียน */}
            {type === "ลาเรียน" && (
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  รายละเอียดการลา
                </label>
                <textarea
                  className="form-control form-control-lg"
                  rows={4}
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </div>
            )}

            <button
              className="btn btn-primary btn-lg w-100 rounded-3 shadow"
              onClick={submit}
            >
              🚀 ส่งคำร้อง
            </button>

          </div>
        </div>
      </div>
    </>
  );
}