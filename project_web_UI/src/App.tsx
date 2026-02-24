import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardStudent from "./pages/DashboardStudent";
import DashboardAdmin from "./pages/DashboardAdmin";
import CreateRequest from "./pages/CreateRequest";
import RequestDetail from "./pages/RequestDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student" element={<DashboardStudent />} />
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path="/create" element={<CreateRequest />} />
      <Route path="/request/:id" element={<RequestDetail />} />
    </Routes>
  );
}

export default App;