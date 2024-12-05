import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { movieColumns, PAGE_SIZE } from "../../constants/constant";
import { Box } from "@mui/material";

const MovieTable = ({
  searchName,
  searchReleaseDate,
}: {
  searchName: string;
  searchReleaseDate: any;
}) => {
  const movies = useSelector((state: RootState) => state.movies.movies);
  const navigate = useNavigate();

  const handleMovieClick = (params: any) => {
    navigate(`/movie/${params.row.imdbID}`, {
      state: { searchName, searchReleaseDate },
    });
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Box
        sx={{
          height: 600,
          width: "100%",
          "& .grid-header-style": {
            backgroundColor: "#121212",
            color: "white",
            fontFamily: "monospace",
            fontSize: "20px",
          },
        }}
      >
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
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
        />
      </Box>
    </div>
  );
};

export default MovieTable;
