import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {

  const navigate = useNavigate();

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:"",
    role:"student"
  });

  const register = async () => {

    try {

      await API.post("/auth/register",form);

      alert("สมัครสมาชิกสำเร็จ");
      navigate("/");

    } catch(err){
      alert("สมัครไม่สำเร็จ");
    }

  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "500px" }}>
        <h3 className="mb-4 text-center">สมัครสมาชิก</h3>

        <input className="form-control mb-3"
          placeholder="ชื่อ-นามสกุล"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input className="form-control mb-3"
          placeholder="อีเมล"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input type="password"
          className="form-control mb-3"
          placeholder="รหัสผ่าน"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <select className="form-select mb-3"
          onChange={(e)=>setForm({...form,role:e.target.value})}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={register} className="btn btn-success w-100">
          สมัครสมาชิก
        </button>
      </div>
    </div>
  );
}