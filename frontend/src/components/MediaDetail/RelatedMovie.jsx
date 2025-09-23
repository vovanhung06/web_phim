import MovieCard from "../MovieCard";
import useFetch from "../../hooks/useFetch";

const RelatedMovie = ({ id, type}) => {
  const  [isLoading, data] = useFetch({ url: `https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US&page=1`})
  const relatedMovie = data?.results || [];
  
  if(isLoading){
    return (<p>Loading...</p>)
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
// const [ relatedMovie, setRelatedMovie] = useState([]);

// useEffect(()=>{
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjAwYjI2YjI5NmVkYWRjZDNiMDBkMGZmMDk4N2NhMSIsIm5iZiI6MTczMzY2MTAwNy4yMDcsInN1YiI6IjY3NTU5MTRmYTE4Y2I4Njk1YWZkNjhlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yp1Xsm8VtauuJiXpH6hGZ79EMn5QaKXSkReRDUOC6gk'
//     }
//   };
  
//   fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options)
//     .then(res => res.json())
//     .then(res => setRelatedMovie(res.results))
//     .catch(err => console.error(err));
// },[])