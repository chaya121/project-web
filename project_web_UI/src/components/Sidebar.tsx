import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      {/* Desktop */}
      <div className="bg-light vh-100 p-3 border-end d-none d-md-block"
        style={{ width: "220px" }}>
        <h5 className="mb-4">เมนู</h5>

        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/student">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create">ส่งคำร้อง</Link>
          </li>
        </ul>
      </div>

      {/* Mobile */}
      <div className="offcanvas offcanvas-start" id="sidebarMobile">
        <div className="offcanvas-header">
          <h5>เมนู</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/student">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">ส่งคำร้อง</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}