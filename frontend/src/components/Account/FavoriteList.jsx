import React from "react";
import { useFavorites } from "../../context/FavoriteContext";
import MovieCard from "../MovieCard";

export default function FavoriteList({ token }) {
  const { favorites } = useFavorites();

  if (!favorites || favorites.length === 0) {
    return <p className="text-gray-400">Bạn chưa có phim nào trong danh sách yêu thích.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">⭐ Danh sách yêu thích</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.map((movie) => (
          <MovieCard key={movie._id} data={movie} mediaType={movie.media_type} token={token} />
        ))}
      </div>
    </div>
  );
}
