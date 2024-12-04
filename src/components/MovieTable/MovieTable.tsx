import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../features/movieSlice";
import { AppDispatch, RootState } from "../../store/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "../../constants/constant";

const MovieTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const movies = useSelector((state: RootState) => state.movies.movies);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMovies("Pokemon"));
  }, [dispatch]);

  const movieColumns: GridColDef[] = [
    { field: "Title", headerName: "Movie Name", width: 450 },
    { field: "Year", headerName: "Release Date", width: 450 },
    { field: "imdbID", headerName: "IMDB ID", width: 450 },
    { field: "Type", headerName: "Type", width: 450 },
  ];

  const handleMovieClick = (params: any) => {
    navigate(`/movie/${params.row.imdbID}`);
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
