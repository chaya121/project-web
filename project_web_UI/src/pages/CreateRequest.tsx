import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function CreateRequest() {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("ส่งคำร้องสำเร็จ");
  };

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <h3 className="mb-4">ส่งคำร้อง</h3>

          <div className="card shadow col-12 col-md-6">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <select className="form-select mb-3">
                  <option>เลือกประเภทคำร้อง</option>
                  <option>ลาเรียน</option>
                  <option>ขอเอกสาร</option>
                </select>

                <input className="form-control mb-3" placeholder="หัวข้อเรื่อง" />

                <textarea
                  className="form-control mb-3"
                  rows={4}
                  placeholder="รายละเอียด"
                />

                <input type="file" className="form-control mb-3" />

                <button type="submit" className="btn btn-primary w-100">
                  ส่งคำร้อง
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}