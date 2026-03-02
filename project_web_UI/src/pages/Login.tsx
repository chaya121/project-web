import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"student" | "admin">("student");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user =
      role === "student"
        ? { id: 1, name: "Somchai", role: "student" }
        : { id: 99, name: "Admin", role: "admin" };

    localStorage.setItem("user", JSON.stringify(user));

    navigate(role === "student" ? "/student" : "/admin");
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow rounded-4" style={{ width: "360px" }}>
        <h4 className="mb-3 text-center fw-bold">เข้าสู่ระบบ</h4>

        <form onSubmit={handleLogin}>
          <input className="form-control mb-3" placeholder="Email" required />
          <input className="form-control mb-3" type="password" placeholder="Password" required />

          <select
            className="form-select mb-3"
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button className="btn btn-primary w-100">Login</button>
        </form>

        <div className="text-center mt-3">
          <Link to="/register">สมัครสมาชิก</Link>
        </div>
      </div>
    </div>
  );
}