import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "nav-link active fw-bold text-primary"
      : "nav-link text-dark";

  return (
    <>
      {/* Desktop */}
      <div className="bg-white vh-100 p-3 border-end shadow-sm d-none d-md-block"
        style={{ width: "240px" }}>
        <h5 className="mb-4 fw-bold">เมนู</h5>

        <ul className="nav flex-column gap-2">

          {user.role === "student" && (
            <>
              <li>
                <Link className={isActive("/student")} to="/student">
                  📊 Dashboard
                </Link>
              </li>
              <li>
                <Link className={isActive("/create")} to="/create">
                  📝 ส่งคำร้อง
                </Link>
              </li>
            </>
          )}

          {user.role === "admin" && (
            <>
              <li>
                <Link className={isActive("/admin")} to="/admin">
                  📊 Dashboard
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile */}
      <div className="offcanvas offcanvas-start" id="sidebarMobile">
        <div className="offcanvas-header">
          <h5>เมนู</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column gap-2">

            {user.role === "student" && (
              <>
                <li><Link className="nav-link" to="/student">Dashboard</Link></li>
                <li><Link className="nav-link" to="/create">ส่งคำร้อง</Link></li>
              </>
            )}

            {user.role === "admin" && (
              <li><Link className="nav-link" to="/admin">Dashboard</Link></li>
            )}

          </ul>
        </div>
      </div>
    </>
  );
}