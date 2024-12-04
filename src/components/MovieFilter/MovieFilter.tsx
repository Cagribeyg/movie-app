import React from "react";
import "./MovieFilter.scss";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

const MovieFilter = ({
  searchName,
  setSearchName,
  searchReleaseDate,
  setReleaseDate,
}: {
  searchName: string;
  setSearchName: Function;
  searchReleaseDate: Dayjs;
  setReleaseDate: Function;
}) => {
  const movieNameValidation = !!searchName.length;

  return (
    <div className="movie-filter-container">
      <div className="movie-filter-title-container">
        <p>Search Movies</p>
      </div>
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
          variant="outlined"
          sx={{
            // Root class for the input field
            "& .MuiOutlinedInput-root": {
              color: "#0E1927",
              fontFamily: "Arial",
              fontWeight: "bold",
              // Class for the border around the input field
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0E1927",
                borderWidth: "2px",
              },
            },
            // Class for the label of the input field
            "& .MuiInputLabel-outlined": {
              color: "#0E1927",
              fontWeight: "bold",
            },
          }}
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
                margin: "normal",
                color: "success",
              },
            }}
            sx={{
              width: "320px", // Root class for the input field
              "& .MuiInputBase-root": {
                color: "#0E1927",
                fontFamily: "Arial",
                fontWeight: "bold",
                // Class for the border around the input field
                "& .MuiInputBase-notchedOutline": {
                  borderColor: "#0E1927",
                  borderWidth: "2px",
                },
              },
              "& .MuiFormLabel-root": {
                color: "#0E1927",
                fontFamily: "Arial",
                fontWeight: "bold",
                // Class for the border around the input field
                "& .MuiInputBase-input": {
                  borderColor: "#0E1927",
                  borderWidth: "2px",
                },
              },
              // Class for the label of the input field
              "& .MuiOutlinedInput-notchedOutline": {
                color: "#0E1927",
                fontWeight: "bold",
              },
              "& .MuiInputLabel-root": {
                color: "#0E1927",
                borderColor: "#0E1927",
              }, //styles the label
              "& .MuiOutlinedInput-root": {
                "&:hover > fieldset": { borderColor: "#0E1927" },
                height: "48px",
                borderRadius: "6px",
              },
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default MovieFilter;
