import React from "react";
import "./MovieFilter.scss";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const MovieFilter = ({
  searchName,
  setSearchName,
  searchReleaseDate,
  setReleaseDate,
}: {
  searchName: string;
  setSearchName: Function;
  searchReleaseDate: any;
  setReleaseDate: Function;
}) => {
  const movieNameValidation = !!searchName.length;
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
          error={!movieNameValidation}
          helperText={!movieNameValidation ? "Movie name must be entered" : ""}
        />
      </div>
      <div className="release-date-filter-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year"]}
            label="Year only"
            value={searchReleaseDate}
            onChange={(newValue) => {
              setReleaseDate(newValue);
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
              },
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default MovieFilter;
