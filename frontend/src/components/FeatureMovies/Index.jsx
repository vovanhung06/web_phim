import { useEffect, useState } from "react";
import Movie from "./Movie";
import PaginateIndicator from "./PaginateIndicator";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [activeMovieID, setActiveMovieID] = useState(null);
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const popularMovies = res.results.slice(0, 4);
        setMovies(popularMovies);
        setActiveMovieID(popularMovies[0].id);
        return popularMovies;
      })
      .then((res) => {
        let i = 0;
        setInterval(() => {
          setActiveMovieID(res[i].id);
          i = (i + 1) % res.length;
        }, 7000);
      })
      .catch((err) => console.error(err));
  }, []);
  
  return (
    <div>
      <div className="relative">
        {movies.length > 0 &&
          movies
          .filter((movie) => movie.id === activeMovieID)
            .map((movie) => <Movie key={movie.id} data={movie} />)}
        <PaginateIndicator
          movies={movies}
          activeMovieID={activeMovieID}
          setActiveMovieID={setActiveMovieID}
          />
      </div>
    </div>
  );
};

export default Index;

// const [isLoading, data] = useFetch({
//   url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
// });
// const movies = (data?.results || []).slice(0, 4);

// useEffect(() => {
//   if (movies.length === 0) return;
//   setActiveMovieID(movies[0]?.id)
//   let i = 0;
//   const interval = setInterval(() => {
//     setActiveMovieID(movies[i]?.id);
//     i = (i + 1) % movies.length;
//   }, 1000);
//   return () => clearInterval(interval);
// }, [movies]);
