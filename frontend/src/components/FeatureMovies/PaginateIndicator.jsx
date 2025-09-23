const PaginateIndicator = ({ movies, activeMovieID, setActiveMovieID }) => {
  return (
    <div>
      <ul className="absolute bottom-[10%] right-[7%] flex gap-0.5">
        {movies.map((movie) => (
          <li
            onClick={() => setActiveMovieID(movie.id)}
            key={movie.id}
            className={`h-1 w-7 rounded-full ${movie.id === activeMovieID ? "bg-gray-100" : "bg-red-600"} `}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default PaginateIndicator;
