import React from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/MediaDetail/Banner";
import ActorList from "../components/MediaDetail/ActorList";
import RelatedMovie from "../components/MediaDetail/RelatedMovie";
import useFetch from "../hooks/useFetch";
import MovieInformation from "../components/MediaDetail/MovieInformation";
import SeasonList from "../components/MediaDetail/SeasonList";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const MediaPage = () => {
  const { id, type } = useParams();

  // movie: /movies/:id?append=release_dates,credits,videos
  // tv:    /tv/:id?append=credits,videos,seasons
  const path = type === "tv" ? `/tv/${id}` : `/movies/${id}`;


  const [isLoading, data] = useFetch({ url: `${API_BASE}${path}` });
  const currentMovie = data || {};

  return (
    <div className="bg-black text-white">
      <Banner mediaDetail={currentMovie} />
      <div className="flex bg-black text-white gap-4">
        <ActorList actors={currentMovie?.credits?.cast || []} />
        <MovieInformation data={currentMovie} type={type} />
      </div>
      {type === "tv" && <SeasonList seasons={currentMovie.seasons || []} />}
      <RelatedMovie id={id} type={type} />
    </div>
  );
};
export default MediaPage;


