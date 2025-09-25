import { useState } from "react";

export default function useFavorite() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const sessionId = import.meta.env.VITE_TMDB_SESSION_ID;
  const accountId = import.meta.env.VITE_TMDB_ACCOUNT_ID;

  const [loading, setLoading] = useState(false);

  // const toggleFavorite = async (mediaId, mediaType, isFavorite) => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(
  //       `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           accept: "application/json",
  //         },
  //         body: JSON.stringify({
  //           media_type: mediaType, // "movie" hoặc "tv"
  //           media_id: mediaId,
  //           favorite: !isFavorite,
  //         }),
  //       }
  //     );
  //     const data = await res.json();
  //     return data.success;
  //   } catch (err) {
  //     console.error("Favorite error:", err);
  //     return false;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return { toggleFavorite, loading };
}
