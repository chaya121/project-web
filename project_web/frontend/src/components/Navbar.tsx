import { useNavigate } from "react-router-dom";
import { useState } from "react";

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const userToken = localStorage.getItem("token");

  let userName = "";

  if (userToken) {
    const payload = parseJwt(userToken);
    userName = payload.name;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-bold">
        🎓 Student Request System
      </span>

      <div className="ms-auto position-relative">
        <button
          className="btn btn-outline-light rounded-pill px-4"
          onClick={() => setOpen(!open)}
        >
          👤 {userName}
        </button>

        {open && (
          <div
            className="card shadow position-absolute mt-2"
            style={{ right: 0, minWidth: "180px" }}
          >
            <div className="card-body p-2">
              <button
                className="btn btn-danger w-100 rounded-pill"
                onClick={handleLogout}
              >
                🚪 ออกจากระบบ
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}