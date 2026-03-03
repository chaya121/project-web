import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/login",{
        email,
        password
      });

      const token = res.data.token;

      localStorage.setItem("token",token);

      const payload = JSON.parse(atob(token.split(".")[1]));

      if(payload.role === "admin"){
        navigate("/admin");
      }else{
        navigate("/student");
      }

    } catch(err){
      alert("Login ไม่สำเร็จ");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow rounded-4" style={{ width: "360px" }}>
        <h4 className="mb-3 text-center fw-bold">เข้าสู่ระบบ</h4>

        <form onSubmit={handleLogin}>

          <input
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">
            Login
          </button>

        </form>

        <div className="text-center mt-3">
          <Link to="/register">สมัครสมาชิก</Link>
        </div>
      </div>
    </div>
  );
}