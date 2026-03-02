import { Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardStudent from "./pages/DashboardStudent";
import DashboardAdmin from "./pages/DashboardAdmin";
import CreateRequest from "./pages/CreateRequest";
import RequestDetail from "./pages/RequestDetail";

function RequireAuth({ children, role }: { children: ReactNode; role?: string }) {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return <>{children}</>;
}

function App() {
  return (
    <Routes>
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
        path="/create"
        element={
          <RequireAuth role="student">
            <CreateRequest />
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

export default App;