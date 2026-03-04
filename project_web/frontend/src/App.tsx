import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardStudent from "./pages/DashboardStudent";
import DashboardAdmin from "./pages/DashboardAdmin";
import CreateRequest from "./pages/CreateRequest";
import RequestDetail from "./pages/RequestDetail";

function RequireAuth({ children, role }: any) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" />;

  const payload = JSON.parse(atob(token.split(".")[1]));
  if (role && payload.role !== role) return <Navigate to="/" />;

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/student"
        element={
          <RequireAuth role="student">
            <DashboardStudent />
          </RequireAuth>
        }
      />

      <Route
        path="/admin"
        element={
          <RequireAuth role="admin">
            <DashboardAdmin />
          </RequireAuth>
        }
      />

      <Route
        path="/create"
        element={
          <RequireAuth role="student">
            <CreateRequest />
          </RequireAuth>
        }
      />

      <Route
        path="/request/:id"
        element={
          <RequireAuth>
            <RequestDetail />
          </RequireAuth>
        }
      />
    </Routes>
  );
}