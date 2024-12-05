import { GridColDef } from "@mui/x-data-grid";

export const BASE_URL = "https://www.omdbapi.com/";
export const MINIMUM_NAME_KEYWORD_LENGTH = 2;

export const movieColumns: GridColDef[] = [
  {
    field: "Title",
    headerName: "Movie Name",
    width: 375,
    headerClassName: "grid-header-style",
  },
  {
    field: "Year",
    headerName: "Release Date",
    width: 375,
    headerClassName: "grid-header-style",
  },
  {
    field: "imdbID",
    headerName: "IMDB ID",
    width: 375,
    headerClassName: "grid-header-style",
  },
  {
    field: "Type",
    headerName: "Type",
    width: 375,
    headerClassName: "grid-header-style",
  },
];
