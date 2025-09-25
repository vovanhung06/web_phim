// context/FavoriteContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const sessionId = import.meta.env.VITE_TMDB_SESSION_ID;
  const accountId = import.meta.env.VITE_TMDB_ACCOUNT_ID;

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hàm lấy danh sách yêu thích (gồm cả movie và tv)
  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const [moviesRes, tvRes] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${apiKey}&session_id=${sessionId}&language=vi-VN`
        ).then((r) => r.json()),
        fetch(
          `https://api.themoviedb.org/3/account/${accountId}/favorite/tv?api_key=${apiKey}&session_id=${sessionId}&language=vi-VN`
        ).then((r) => r.json()),
      ]);

      setFavorites([
        ...(moviesRes.results || []).map((m) => ({ ...m, media_type: "movie" })),
        ...(tvRes.results || []).map((t) => ({ ...t, media_type: "tv" })),
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Thêm / xoá yêu thích và đồng bộ lại
  const toggleFavorite = async (media, isCurrentlyFavorite) => {
    await fetch(
      `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          media_type: media.media_type,
          media_id: media.id,
          favorite: !isCurrentlyFavorite,
        }),
      }
    );

    // Sau khi gọi API xong, refresh lại danh sách để mọi nơi đồng bộ
    fetchFavorites();
  };

  return (
    <FavoriteContext.Provider value={{ favorites, loading, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoriteContext);
}
