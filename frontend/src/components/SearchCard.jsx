import React from "react";
import { Link } from "react-router-dom";

const SearchCard = ({ data }) => {
  const id = data?._id ?? data?.id;

  return (
    <Link
      to={`/movies/${id}`}
      className="flex items-center gap-3 p-2 hover:bg-gray-100 transition duration-150"
    >
      <img
        loading="lazy"
        src={
          data?.poster_path
            ? `${import.meta.env.VITE_IMAGE_BASE_URL}${data.poster_path}`
            : "https://placehold.co/60x90?text=No+Image"
        }
        alt={data?.title}
        className="w-12 h-16 object-cover rounded-md"
      />
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold line-clamp-1">{data?.title}</h3>
        <p className="text-xs text-gray-600">{data?.release_date}</p>
      </div>
    </Link>
  );
};

export default SearchCard;
