import React from "react";
import CircularProgressBar from "../MediaList/CircularProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { groupBy } from "lodash";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Image from "../Image";
import { useModalContext } from "../../context/ModalProvider";
const Banner = ({ mediaDetail }) => {
  const {
    backdrop_path,
    poster_path,
    title,
    overview,
    release_dates,
    release_date,
    genres,
    vote_average,
    credits,
    name,
    videos
  } = mediaDetail;
  const { setIsShowing, setContent } = useModalContext();
  const certification =
    release_dates?.results.find((nation) => nation.iso_3166_1 === "US")
      .release_dates[0].certification || "R";
  const crews = (credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));
  const groupedCrews = groupBy(crews, "job");
  return (
      <div className="relative">
        <img
          className="top-0 brightness-[0.3] relative"
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt=""
        />
        <div className="absolute top-0 left-0 right-0 mx-auto flex max-w-screen-xl gap-6 p-6 text-white">
          <div className="flex-1">
            <Image
              className="w-full rounded-xl"
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`}
              alt=""
              width={600}
              height={900}
            />
          </div>
          <div className="flex-[2] text-[1.8vw]">
            <h2 className="text-[3vw] font-bold">{title || name}</h2>
            <div className="flex gap-4 text-gray-200">
              <p className="border-2 border-white px-1">{certification}</p>
              <p>{release_date}</p>
              <p>{(genres || []).map((genre) => genre.name).join(", ")}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="mt-[3vw] flex">
                <CircularProgressBar score={vote_average} />
              </div>
              <button
                onClick={() => {
                  const mediaTrailer = (videos?.results || []).find((video)=> video?.type === 'Trailer');
                  setIsShowing(true);
                  setContent(mediaTrailer.key);
                }}
                className="rounded-full bg-[#E50914] px-[2vw] py-[0.5vw]"
              >
                <FontAwesomeIcon icon={faPlay} /> Play
              </button>
            </div>
            <h3 className="text-[2vw] font-bold">Overview</h3>
            <p>{overview}</p>
            <div className="flex gap-6">
              {Object.keys(groupedCrews).map((job) => (
                <div key={job}>
                  <h4 className="text-[1.5vw] font-semibold">{job}</h4>
                  <p>{groupedCrews[job].map((crew) => crew.name).join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Banner;
