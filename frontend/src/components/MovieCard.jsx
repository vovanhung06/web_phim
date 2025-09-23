import React from "react";
import CircularProgressBar from "./MediaList/CircularProgressBar";
import { Link } from "react-router-dom";
import ImageComponent from "./Image";

const MovieCard = ({ data, mediaType = "" }) => {
  const { poster_path, media_type, vote_average, original_language, id } = data;
  const { title, release_date, name, first_air_date } = data;
  let cardName, releaseDate, type;
 if (title || media_type === "movie" || media_type === mediaType) {
    cardName = title;
    releaseDate = release_date;
    type = "movie";
  } else if (name || media_type === "tv" || media_type === mediaType) {
    cardName = name;
    releaseDate = first_air_date;
    type = "tv";
  }
  return (
    <Link to={`/${type}/${id}`} className="rounded-lg border border-slate-800">
      <div className="relative">
        {type === "tv" && (
          <p className="absolute right-0 mt-2 rounded-l-lg bg-[#E50914] p-1 font-bold">
            TV Show
          </p>
        )}
        <ImageComponent
          className="w-full rounded-t-lg"
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt=""
          width={210}
          height={300}
        />
        <div className="px-4 py-2">
          <CircularProgressBar score={vote_average} />
          <p className="absolute bottom-[20%] right-[1vw] grid w-9 place-items-center rounded-md bg-slate-700 px-2">
            {original_language}
          </p>
          <h3 className="mt-2 font-bold">{cardName}</h3>
          <p className="text-slate-300">{releaseDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
