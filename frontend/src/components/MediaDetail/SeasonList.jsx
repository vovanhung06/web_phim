import React from "react";
import ImageComponent from "../Image";
import CircularProgressBar from "../MediaList/CircularProgressBar";

const SeasonList = ({ seasons }) => {
  return (
    <div className="m-5 bg-black p-1 text-white">
      <p className="py-4 text-[2.5vw] font-bold">Seasons</p>
      {seasons.map((seasons) => {
        return (
          <div key={seasons.id} className="my-3 flex gap-5 rounded-lg border border-slate-300 p-2 shadow-sm">
            <ImageComponent
              src={`https://media.themoviedb.org/t/p/w130_and_h195_face/${seasons.poster_path}`}
              height={195}
              width={130}
              className={"rounded-lg"}
            />
            <div className="space-y-1">
              <h2 className="mb-4 text-[1.4vw] font-bold">{`Season: ${seasons.season_number}`}</h2>
              <div className="flex">
                <p className="flex items-center">Rating: </p>
                <CircularProgressBar score={seasons.vote_average} />
              </div>
              <p>{`Release Date: ${seasons.air_date}`}</p>
              <p>{`${seasons.episode_count} Espisodes`}</p>
              <p>{seasons.overview}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SeasonList;
