import MovieCard from "../MovieCard";
import useFetch from "../../hooks/useFetch";


const RelatedMovie = ({ id, type }) => {

  const [isLoading, data] = useFetch({ url: `/movies/popular` })

  const relatedMovie = data?.results || [];

  if (isLoading) {
    return (<p>Loading...</p>);
  }
  return (
    <div className="sm:grid-cols-4 p-4">
      <h2 className="font-bold py-7">More Like This</h2>
      <div className="grid grid-cols-5 gap-3">
        {
          relatedMovie.map((movie, index) => (
            <MovieCard key={movie._id || movie.id || index} data={movie} />
          ))

        }
      </div>
    </div>
  );
};

export default RelatedMovie;
