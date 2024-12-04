import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
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
    let requestUrl = `${BASE_URL}?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${requestParams.nameQuery}`;
    if (requestParams.nameQuery && requestParams.releaseDateQuery) {
      requestUrl = `${requestUrl}&y=${requestParams.releaseDateQuery}`;
    }

    let response: AxiosResponse = await axios.get(requestUrl);
    let filteredResponse;

    if (!response?.data.Error) {
      // Filtering for movie type episode, series, movie; excluding game
      filteredResponse = response?.data?.Search.filter((movie: any) =>
        ["movie", "series", "episode"].includes(movie["Type"])
      );
    }

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
