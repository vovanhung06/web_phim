import React from "react";
import ImageComponent from "../Image";
import { Link } from "react-router-dom";

const ActorInfo = ({ name, character, img, id, popularity }) => {
  return (
    <Link to={`/actor/${id}`} className="rounded-lg border border-slate-300 shadow-sm">
      <ImageComponent
        className="rounded-t-lg w-full"
        src={img ? `https://media.themoviedb.org/t/p/w276_and_h350_face/${img}` : 'https://placehold.co/276x350?text=No%20image'}
        alt=""
        height={350}
        width={276}
      />
      <div className="p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        <p>{popularity}</p>
      </div>
    </Link>
  );
};

export default ActorInfo;
