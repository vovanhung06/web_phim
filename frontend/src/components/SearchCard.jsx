import React from "react";
import { Link } from "react-router-dom";

const SearchCard = ({data}) => {
  return (
    <Link to={`/movie/${data?.id}`} className="flex h-14 items-center gap-2 border-b border-gray-400 px-2 text-xs font-bold min-w-44">
      <img
        loading="lazy"
        src={data?.backdrop_path ? `https://media.themoviedb.org/t/p/w500_and_h282_face${data?.backdrop_path}` : 'https://placehold.co/500x282?text=...'}
        alt=""
        className="w-20 rounded-md"
      />
      <div>
        <h3 className="pb-1">{data?.title}</h3>
        <p className="font-light">{data?.release_date}</p>
      </div>
    </Link>
  );
};

export default SearchCard;
