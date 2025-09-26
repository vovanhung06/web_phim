import MovieCard from "../MovieCard";
import useFetch from "../../hooks/useFetch";


const RelatedMovie = ({ id, type}) => {
  
  //const  [isLoading, data] = useFetchtm({ url: `https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US&page=1`})
  const  [isLoading, data] = useFetch({ url: `/movies/popular`})

  const relatedMovie = data?.results || [];
  
  if(isLoading){
    return (<p>Loading...</p>);
  }
  return (
    <div className="sm:grid-cols-4 p-4">
      <h2 className="font-bold py-7">More Like This</h2>
      <div className="grid grid-cols-5 gap-3">
        {
          relatedMovie.map((movie)=>{
            return <MovieCard key={movie.id} data={movie}/>
          })
        }
      </div>
    </div>
  );
};

export default RelatedMovie;
