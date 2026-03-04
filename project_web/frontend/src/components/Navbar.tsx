import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4 py-3 d-flex justify-content-between align-items-center">

      {/* ซ้าย */}
      <h4 className="text-white m-0">
        🎓 Student Request System
      </h4>

      {/* ขวา */}
      <div className="d-flex align-items-center gap-3">

        {/* User Badge */}
        <div className="bg-secondary text-white px-3 py-2 rounded-pill">
          👤 A
        </div>

        {/* Logout Button */}
        <button
          className="btn btn-danger rounded-pill px-4 shadow-sm"
          onClick={logout}
        >
          🚪 ออกจากระบบ
        </button>

      </div>

    </nav>
  );
}