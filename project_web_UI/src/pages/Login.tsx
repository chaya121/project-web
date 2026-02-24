import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"student" | "admin">("student");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(role === "student" ? "/student" : "/admin");
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-8 col-md-5 col-lg-4 col-xl-3">

          <div className="card shadow p-4">
            <h2 className="text-center mb-4">เข้าสู่ระบบ</h2>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                required
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                required
              />

              <div className="mb-3">
                <label className="fw-bold">เข้าสู่ระบบเป็น</label>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={role === "student"}
                    onChange={() => setRole("student")}
                  />
                  <label className="form-check-label">
                    นักเรียน (Student)
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={role === "admin"}
                    onChange={() => setRole("admin")}
                  />
                  <label className="form-check-label">
                    ผู้ดูแล (Admin)
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                เข้าสู่ระบบ
              </button>
            </form>

            <div className="text-center mt-3">
              ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}