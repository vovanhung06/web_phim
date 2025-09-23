import React from "react";
import ImageComponent from "../components/Image";
import { useLoaderData } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";

const GENDER_MAPPING = {
  0: "Not set / not specified",
  1: "Female",
  2: "Male",
  3: "Non-binary",
};

const ActorPage = () => {
  const { known_for_department, gender, place_of_birth, name, birthday, biography, id, profile_path } = useLoaderData();
  const [isLoading, data] = useFetch({url: `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`});
  const casts = data?.cast || []
  return (
    <div className="flex gap-[1vw] p-5">
      <div className="flex-1">
        <ImageComponent
          width={600}
          height={600}
          className={"rounded-3xl"}
          src={
            `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${profile_path}`
          }
        />
        <div className="my-4 space-y-4 px-3">
          <h2 className="text-lg font-bold">Personal Infor</h2>
          <div className="space-y-1">
            <h3 className="font-bold">Known for:</h3>
            <p>{known_for_department}</p>
          </div>
          <div>
            <h3 className="font-bold">Gender:</h3>
            <p>{GENDER_MAPPING[gender]}</p>
          </div>
          <div>
            <h3 className="font-bold">Place of Birth:</h3>
            <p>{place_of_birth}</p>
          </div>
          <div>
            <h3 className="font-bold">Birthday:</h3>
            <p>{birthday}</p>
          </div>
        </div>
      </div>
      <div className="flex-[2] space-y-6">
        <h1 className="text-2xl font-bold">{name}</h1>
        <div>
          <h2 className="text-lg font-bold">Biology</h2>
          <p className="whitespace-pre-line">{biography}</p>
        </div>
        <div>
          <h2 className="text-lg font-bold">Known for:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
              casts.map((cast)=>{
                return <MovieCard data={cast}/>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorPage;
