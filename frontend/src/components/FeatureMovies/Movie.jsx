import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import { useModalContext } from "../../context/ModalProvider";
import { useState } from "react";
import { Link } from "react-router-dom";

const Movie = (props) => {
  const { data: { backdrop_path, title, release_date, overview, id }} = props;
  const { setIsShowing, setContent } = useModalContext();
  const [isLoading, data] = useFetch({ url: `https://api.themoviedb.org/3/movie/${id}/videos` });
  const youtubeKey = (data?.results || []).find((video) => video.type === 'Trailer')?.key
  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        alt=""
        className="w-screen brightness-50"
      />
      <div className="absolute bottom-[20%] left-[8%] w-[50%] text-white">
        <h2 className="mb-3 text-3xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <p className="mb-2 inline-block border border-gray-400 px-2 font-bold text-gray-400">
            PG13
          </p>
          <p className="my-1 font-light">{release_date}</p>
        </div>
        <div className="hidden sm:block">
          <h3 className="text-2xl font-bold">Overview</h3>
          <p className="font-extralight">{overview}</p>
        </div>
        <div>
          <button onClick={()=>{
            setIsShowing(true);
            setContent(youtubeKey);
          }} className="mr-2 mt-3 rounded-full bg-[#E50914] px-4 py-1">
            <FontAwesomeIcon className="mr-3" icon={faPlay} />
            Play
          </button>
          <Link to={`/movie/${id}`}>Chi Tiết</Link>
        </div>
      </div>
    </div>
  );
};

export default Movie;
