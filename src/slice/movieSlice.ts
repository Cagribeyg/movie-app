import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants/constant";
import { MoviesState, requestParamsInterface } from "../interfaces/interfaces";

const initialState: MoviesState = {
  movies: [],
  status: "idle",
  selectedMovie: null,
};

// Create Redux async thunk actions to http requests
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (requestParams: requestParamsInterface) => {
    let generatedUrl = `${BASE_URL}?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${requestParams.nameQuery}`;
    if (requestParams.nameQuery && requestParams.releaseDateQuery) {
      generatedUrl = `${generatedUrl}&y=${requestParams.releaseDateQuery}`;
    }
    const response = await axios.get(generatedUrl);
    return response.data.Search || [];
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (imdbID: string) => {
    const response = await axios.get(
      `${BASE_URL}?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${imdbID}`
    );
    return response.data;
  }
);

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
        state.movies = action.payload;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.selectedMovie = action.payload;
      });
  },
});

export default moviesSlice.reducer;
