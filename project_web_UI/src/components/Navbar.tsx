import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary px-3 d-flex justify-content-between">
      <button
        className="btn btn-light d-md-none"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMobile"
      >
        ☰
      </button>

      <span className="navbar-brand m-0">
        ระบบคำร้องออนไลน์
      </span>

      <Link to="/" className="btn btn-light btn-sm">
        ออกจากระบบ
      </Link>
    </nav>
  );
}