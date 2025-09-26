import React, { useState } from "react";
import SearchForm from "../components/SearchForm";
import useFetch from "../hooks/useFetch";
import CardList from "../components/CardList";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const SearchPage = () => {
  const [searchFormValue, setSearchFormValue] = useState({
    mediaType: "movie",
    genres: [],
    rating: "all",
  });

  const [min, max] =
    searchFormValue.rating === "all"
      ? [0, 10]
      : searchFormValue.rating.split("-");

  const [loading, data] = useFetch({
    url: `${API_BASE}/discover/${searchFormValue.mediaType}?with_genres=${encodeURIComponent(
      searchFormValue.genres.join(",")
    )}&vote_average.gte=${min}&vote_average.lte=${max}`,
  });

  return (
    <div className="gap-[1vw] p-5 lg:px-[10vw] text-black">
      <h1 className="font-semibold text-xl">Search</h1>
      <div className="flex gap-4 py-4">
        <div className="flex-1">
          <SearchForm setSearchFormValue={setSearchFormValue} />
        </div>
        <div className="flex-[3]">
          <CardList data={data?.results} mediaType={searchFormValue.mediaType} />
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
