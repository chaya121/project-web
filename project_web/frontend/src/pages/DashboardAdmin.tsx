import React, { useEffect, useState } from 'react';
import { getRequests, deleteRequest, getUsers } from '../api';

export default function DashboardAdmin() {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchAll = async () => {
    const r = await getRequests();
    setRequests(r);
    const u = await getUsers();
    setUsers(u);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this request?')) return;
    await deleteRequest(id);
    // refresh
    fetchAll();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Users</h3>
      <ul>{users.map((u:any)=> <li key={u._id}>{u.name} ({u.email})</li>)}</ul>

      <h3>Requests</h3>
      <table>
        <thead><tr><th>Title</th><th>User</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {requests.map((r:any)=>(
            <tr key={r._id}>
              <td>{r.title}</td>
              <td>{r.user?.name}</td>
              <td>{r.status}</td>
              <td>
                <button onClick={()=> handleDelete(r._id)}>Delete</button>
                {/* อาจเพิ่ม Edit/View */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}