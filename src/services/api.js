import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

export const getAllStudents = () => api.get("/students").then((r) => r.data);
export const getStudentById = (id) =>
  api.get(`/students/${id}`).then((r) => r.data);
export const getStudentsByMajor = (m) =>
  api.get(`/students/major/${encodeURIComponent(m)}`).then((r) => r.data);
export const getStudentsByCity = (c) =>
  api.get(`/students/city/${encodeURIComponent(c)}`).then((r) => r.data);
export const getTopStudents = (n = 3) =>
  api.get(`/students/top/${n}`).then((r) => r.data);
export const sendChatMessage = (msg) =>
  api.post("/chat", { message: msg }).then((r) => r.data);
