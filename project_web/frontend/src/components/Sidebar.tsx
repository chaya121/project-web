import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar p-3">
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link" to="/student">
            📋 Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/create">
            📝 สร้างคำร้อง
          </Link>
        </li>
      </ul>
    </div>
  );
}