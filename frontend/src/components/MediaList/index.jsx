import React, { useState } from "react";
import MovieCard from "../MovieCard";
import useFetch from "../../hooks/useFetch";

const MediaList = ({ title, types}) => {
  const [mediaType, setMediaType] = useState(types[0].id);
  const url = types.find(type=>type.id === mediaType).APIurl;
  const [isLoading, data] = useFetch({url: url})
  const mediaList = (data?.results || []).slice(0, 12)
  
  return (
    <div className="bg-black p-[4vw] text-[1.2vw] text-white">
      <div className="flex items-center gap-5">
        <h3 className="text-[2vw] font-bold">{title}</h3>
        <ul className="flex gap-2 rounded border border-white text-[1.2vw] text-xs">
          {types.map((type) => {
            return (
              <li
              onClick={() => {
                setMediaType(type.id);
                }}
                key={type.id}
                className={`p-[0.4vw] px-2 ${type.id === mediaType ? "rounded bg-white text-black" : ""} cursor-pointer`}
                >
                {type.title}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-10 sm:grid-cols-4 lg:grid-cols-6">
        {mediaList.map((item) => {
          return <MovieCard key={item.id} data={item} type={mediaType}/>;
        })}
      </div>
    </div>
  );
};

export default MediaList;
// const [mediaList, setMediaList] = useState([]);

// useEffect(() => {
  //   const url = types.find(type=>type.id === mediaType).APIurl;
  //   fetch(
//     url,
//     {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjAwYjI2YjI5NmVkYWRjZDNiMDBkMGZmMDk4N2NhMSIsIm5iZiI6MTczMzY2MTAwNy4yMDcsInN1YiI6IjY3NTU5MTRmYTE4Y2I4Njk1YWZkNjhlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yp1Xsm8VtauuJiXpH6hGZ79EMn5QaKXSkReRDUOC6gk",
//       },
//     },
//   )
//     .then((res) => res.json())
//     .then((res) => {
//       const tredingMediaList = res.results.slice(0, 12);
//       setMediaList(tredingMediaList);
//     })
//     .catch((err) => console.error(err));
// }, [mediaType]);