import React, { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { useWatch } from "react-hook-form";

const GenreInput = ({ control, onChange, value = [] }) => {
  const mediaType = useWatch({ name: "mediaType", control });
  const [isLoading, data] = useFetch(
    { url: `https://api.themoviedb.org/3/genre/${mediaType}/list` },
    mediaType,
  );
  useEffect(()=>{
    onChange([])
  },[mediaType])
  return (
    <div className="flex flex-wrap gap-1">
      {data?.genres.map((genre) => {
        return (
          <p
            onClick={()=>{
              let newValue = [...value];
              if(newValue.includes(genre.id)){
                newValue = newValue.filter((g)=> g!==genre.id);
              }
              else{
                newValue = [...newValue, genre.id]
              }
              onChange(newValue)
            }}
            key={genre.id}
            className={`cursor-pointer rounded-lg border px-2 py-1 ${value.includes(genre.id) ? 'bg-black text-white' : ''}`}
          >
            {genre.name}
          </p>
        );
      })}
    </div>
  );
};

export default GenreInput;
