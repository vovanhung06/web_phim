// src/context/FavoriteContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { addFavorite, removeFavorite, getFavorites } from "../libs/api";
import { useAuth } from "./AuthContext";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const { token } = useAuth(); // 👈 lấy token từ AuthContext
  const [favorites, setFavorites] = useState([]);

  // Load danh sách favorites mỗi khi token thay đổi
  useEffect(() => {
    if (token) {
      getFavorites()
        .then((res) => {
          if (Array.isArray(res)) {
            setFavorites(res);
          } else if (res.favorites) {
            setFavorites(res.favorites);
          } else {
            setFavorites([]);
          }
        })
        .catch(() => setFavorites([]));
    } else {
      setFavorites([]); // khi logout thì clear luôn
    }
  }, [token]); // 👈 chạy lại mỗi khi token đổi (login/logout)

  const toggleFavorite = async (movie) => {
    const movieId = Number(movie._id || movie.id);
    const isFav = favorites.some(
      (f) => Number(f._id || f.id) === movieId
    );

    try {
      if (isFav) {
        await removeFavorite(movieId);
      } else {
        await addFavorite(movieId);
      }
      // Sau khi thêm / xóa, fetch lại danh sách mới
      const updated = await getFavorites();
      setFavorites(Array.isArray(updated) ? updated : updated.favorites || []);
    } catch (err) {
      console.error("❌ API error:", err);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
