import React from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/MediaDetail/Banner";
import ActorList from "../components/MediaDetail/ActorList";
import RelatedMovie from "../components/MediaDetail/RelatedMovie";
import useFetch from "../hooks/useFetch";
import MovieInformation from "../components/MediaDetail/MovieInformation";
import SeasonList from "../components/MediaDetail/SeasonList";

const MediaPage = () => {
  const { id, type } = useParams();
  const [isLoading, data] = useFetch({
    url: `https://api.themoviedb.org/3/${type}/${id}?append_to_response=release_dates,credits,videos`,
  });
  const currentMovie = data || {};
  return (
    <div className="bg-black text-white">
      <Banner mediaDetail={currentMovie} />
      <div className="flex bg-black text-white gap-4">
        <ActorList actors={currentMovie?.credits?.cast || []} />
        <MovieInformation data={currentMovie} type={type}/>
      </div>
      {type === 'tv' && <SeasonList seasons={currentMovie.seasons || []}/>}
      <RelatedMovie id={id} type={type}/>
    </div>
  );
};

export default MediaPage;

