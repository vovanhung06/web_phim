// src/libs/api.js
const BASE = import.meta.env.VITE_API_BASE_URL;

export async function api(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ===== API favorites =====
export function addFavorite(movieId) {
  return api(`/favorites/${movieId}`, { method: "POST" });
}

export function removeFavorite(movieId) {
  return api(`/favorites/${movieId}`, { method: "DELETE" });
}

export function getFavorites() {
  return api(`/favorites`, { method: "GET" });
}
