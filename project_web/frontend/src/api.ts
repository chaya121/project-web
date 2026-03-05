// frontend/src/api.ts
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// helper to attach token
function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// existing functions ...
export async function getRequests() {
  const res = await axios.get(`${API_BASE}/requests`, { headers: authHeaders() });
  return res.data;
}

export async function createRequest(payload: any) {
  const res = await axios.post(`${API_BASE}/requests`, payload, { headers: authHeaders() });
  return res.data;
}

export async function updateRequest(id: string, payload: any) {
  const res = await axios.put(`${API_BASE}/requests/${id}`, payload, { headers: authHeaders() });
  return res.data;
}

// NEW: get single request
export async function getRequestById(id: string) {
  const res = await axios.get(`${API_BASE}/requests/${id}`, { headers: authHeaders() });
  return res.data;
}

// NEW: delete request (admin)
export async function deleteRequest(id: string) {
  const res = await axios.delete(`${API_BASE}/requests/${id}`, { headers: authHeaders() });
  return res.data;
}

// NEW: get users (admin)
export async function getUsers() {
  const res = await axios.get(`${API_BASE}/users`, { headers: authHeaders() });
  return res.data;
}

// auth functions (login/register)
export async function login(email: string, password: string) {
  const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
  return res.data;
}
export async function register(payload: any) {
  const res = await axios.post(`${API_BASE}/auth/register`, payload);
  return res.data;
}