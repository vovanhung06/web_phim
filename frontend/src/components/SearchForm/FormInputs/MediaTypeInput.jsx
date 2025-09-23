import React from "react";

const MediaTypeInput = ({ onChange, name, value }) => {
  return (
    <div>
      <input
        className="mr-2"
        id="sf-type-movie"
        type="radio"
        name={name}
        value={"movie"}
        onChange={onChange}
        checked={value === "movie"}
      />
      <label htmlFor="sf-type-movie">Movie</label>

      <br />
      <input
        className="mr-2"
        id="sf-type-tv"
        type="radio"
        name={name}
        value={"tv"}
        onChange={onChange}
        checked={value === "tv"}
      />
      <label htmlFor="sf-type-tv">TV Show</label>
    </div>
  );
};

export default MediaTypeInput;
