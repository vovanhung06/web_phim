import MovieCard from "../MovieCard";
import { useFavorites } from "../../context/FavoriteContext";

export default function FavoriteList() {
  const { favorites, loading } = useFavorites();

  if (loading) return <p>Đang tải danh sách yêu thích...</p>;
  if (!favorites || favorites.length === 0)
    return <p className="text-gray-500">Bạn chưa có phim nào trong danh sách yêu thích.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">⭐ Danh sách yêu thích</h2>
      <div className="grid grid-cols-5 gap-4">
        {favorites.map((item) => (
          <MovieCard
            key={`${item.media_type}-${item.id}`}
            data={item}
            mediaType={item.media_type}
          />
        ))}
      </div>
    </div>
  );
}
