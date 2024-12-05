import { createSlice } from "@reduxjs/toolkit";
import { MoviesState } from "../../interfaces/interfaces";
import { fetchMovieDetails, fetchMovies } from "../actions/movieActions";

const initialState: MoviesState = {
  movies: [],
  status: "idle",
  selectedMovie: null,
  rowCount: 1,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "idle";
        // Filtering for movie type episode, series, movie; excluding game
        const filteredSearchMovieList = action.payload?.Search.filter(
          (movie: any) => ["movie", "series", "episode"].includes(movie["Type"])
        );
        state.movies = filteredSearchMovieList;
        const responseTotalCount = action.payload?.totalResults;
        state.rowCount = responseTotalCount - filteredSearchMovieList?.length;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.selectedMovie = action.payload;
      });
  },
});

export default moviesSlice.reducer;
