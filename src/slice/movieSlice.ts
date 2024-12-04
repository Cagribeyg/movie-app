import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants/constant";
import { MoviesState, RequestParamsInterface } from "../interfaces/interfaces";

const initialState: MoviesState = {
  movies: [],
  status: "idle",
  selectedMovie: null,
};

// Create Redux async thunk actions to http requests
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (requestParams: RequestParamsInterface) => {
    let generatedUrl = `${BASE_URL}?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${requestParams.nameQuery}`;
    if (requestParams.nameQuery && requestParams.releaseDateQuery) {
      generatedUrl = `${generatedUrl}&y=${requestParams.releaseDateQuery}`;
    }
    let response: any = await axios.get(generatedUrl);
    // Filtering for movie type episode, series, movie; excluding game
    let filteredResponse = response?.data?.Search.filter((movie: any) =>
      ["movie", "series", "episode"].includes(movie["Type"])
    );

    return filteredResponse || [];
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
