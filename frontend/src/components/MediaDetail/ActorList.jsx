import React, { useState } from "react";
import ActorInfo from "./ActorInfo";

const ActorList = ({ actors }) => {
  const [display, setDisplay] = useState(true);
  const currentActors = display ? actors.slice(0, 4) : actors.slice(0, 32);
  return (
    <div className="flex-[2]">
      <p className="py-4 text-[2.5vw] font-bold">Actors</p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {currentActors.map((actor) => (
          <ActorInfo
            key={actor.id}
            name={actor.name}
            character={actor.character}
            img={actor.profile_path}
            id = {actor.id}
            popularity = {actor.popularity}
          />
        ))}
      </div>
      <p className="cursor-pointer" onClick={() => setDisplay(!display)}>
        {display ? "Show More" : "Show Less"}
      </p>
    </div>
  );
};

export default ActorList;
