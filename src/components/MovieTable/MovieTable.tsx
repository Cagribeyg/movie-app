import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { movieColumns } from "../../constants/constant";
import { Box } from "@mui/material";
import "./MovieTable.scss";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchMovies } from "../../redux/actions/movieActions";

const MovieTable = ({
  searchName,
  searchReleaseDate,
}: {
  searchName: string;
  searchReleaseDate: any;
}) => {
  const movies = useSelector((state: RootState) => state.movies.movies);
  const rowCount = useSelector((state: RootState) => state.movies.rowCount);
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleMovieClick = (params: any) => {
    navigate(`/movie/${params.row.imdbID}`, {
      state: { searchName, searchReleaseDate },
    });
  };

  useEffect(() => {
    if (paginationModel.page !== 0) {
      let requestParams = {
        nameQuery: searchName,
        releaseDateQuery: searchReleaseDate ? searchReleaseDate["$y"] : null,
        page: paginationModel.page,
      };
      dispatch(fetchMovies(requestParams));
    }
  }, [paginationModel.page, searchReleaseDate, searchName, dispatch]);
  const handlePagination = (e: any, t: any) => {
    if (paginationModel.page + 1 === 1) {
      setPaginationModel((prev) => {
        return {
          ...prev,
          page: e.page + 1,
        };
      });
    } else {
      setPaginationModel(e);
    }
  };
  return (
    <div className="movie-table-container">
      <Box
        sx={{
          height: 600,
          width: "1500px",
          "& .grid-header-style": {
            backgroundColor: "#F5C518",
            color: "#0E1927",
            fontFamily: "monospace",
            fontSize: "20px",
          },
        }}
      >
        <DataGrid
          rows={movies}
          columns={movieColumns}
          getRowId={(row: { imdbID: any }) => row.imdbID}
          rowCount={rowCount}
          paginationMode="server"
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 1, // default value will be used if not passed */
              },
            },
          }}
          paginationModel={paginationModel}
          onPaginationModelChange={(e, t) => handlePagination(e, t)}
          onRowClick={handleMovieClick}
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "#0E1927",
            },
          }}
        />
      </Box>
    </div>
  );
};

export default MovieTable;
