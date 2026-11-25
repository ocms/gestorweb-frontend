import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function obterCsrfToken(): string {
  const cookies = document.cookie.split(";");

  const csrf = cookies.find((cookie) => cookie.trim().startsWith("csrftoken="));

  return csrf ? decodeURIComponent(csrf.split("=")[1]) : "";
}

export default api;
