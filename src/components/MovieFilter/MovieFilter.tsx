import React from "react";
import "./MovieFilter.scss";
import { TextField } from "@mui/material";

const MovieFilter = ({
  searchName,
  setSearchName,
  searchReleaseDate,
  setReleaseDate,
}: {
  searchName: string;
  setSearchName: Function;
  searchReleaseDate: string;
  setReleaseDate: Function;
}) => {
  return (
    <div className="movie-filter-container">
      <div className="name-filter-container">
        <TextField
          id="outlined-helperText"
          label="Search By Name"
          defaultValue="Pokemon"
          style={{ marginLeft: "20px" }}
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      <div className="release-date-filter-container">
        <TextField
          id="outlined-helperText"
          label="Search By Release Date"
          defaultValue="2010"
          value={searchReleaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MovieFilter;
