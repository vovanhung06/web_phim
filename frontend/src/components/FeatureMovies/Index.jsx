import { useEffect, useState } from "react";
import Movie from "./Movie";
import PaginateIndicator from "./PaginateIndicator";
import useFetch from "../../hooks/useFetch";

const Index = () => {
  const [activeMovieID, setActiveMovieID] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

const [isLoading, data] = useFetch({
  url: `${API_BASE}/movies/popular?page=1`,
});


  const movies = (data?.results || []).slice(0, 4);

  useEffect(() => {
    if (movies.length === 0) return;
    setActiveMovieID(movies[0].id);
    let i = 0;
    const interval = setInterval(() => {
      setActiveMovieID(movies[i].id);
      i = (i + 1) % movies.length;
    }, 7000);
    return () => clearInterval(interval);
  }, [movies]);

  return (
    <div className="relative">
      {movies
        .filter((movie) => movie.id === activeMovieID)
        .map((movie) => (
          // ✅ Truyền prop data vào Movie
          <Movie key={movie.id} data={movie} />
        ))}
      <PaginateIndicator
        movies={movies}
        activeMovieID={activeMovieID}
        setActiveMovieID={setActiveMovieID}
      />
    </div>
  );
};

export default Index;
