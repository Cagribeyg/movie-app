import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "../../constants/constant";

const MovieTable = ({
  searchName,
  searchReleaseDate,
}: {
  searchName: string;
  searchReleaseDate: any;
}) => {
  const movies = useSelector((state: RootState) => state.movies.movies);
  const navigate = useNavigate();

  const movieColumns: GridColDef[] = [
    { field: "Title", headerName: "Movie Name", width: 450 },
    { field: "Year", headerName: "Release Date", width: 450 },
    { field: "imdbID", headerName: "IMDB ID", width: 450 },
    { field: "Type", headerName: "Type", width: 450 },
  ];

  const handleMovieClick = (params: any) => {
    navigate(`/movie/${params.row.imdbID}`, {
      state: { searchName, searchReleaseDate },
    });
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={movies}
        columns={movieColumns}
        getRowId={(row: { imdbID: any }) => row.imdbID}
        initialState={{
          pagination: {
            paginationModel: { pageSize: PAGE_SIZE, page: 0 },
          },
        }}
        onRowClick={handleMovieClick}
      />
    </div>
  );
};

export default MovieTable;
