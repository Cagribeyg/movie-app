import { createAsyncThunk } from "@reduxjs/toolkit";
import { RequestParamsInterface } from "../../interfaces/interfaces";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../../constants/constant";

// Create Redux async thunk actions to http requests
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (requestParams: RequestParamsInterface) => {
    let requestUrl = `${BASE_URL}?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${requestParams.nameQuery}`;
    if (requestParams.nameQuery && requestParams.releaseDateQuery) {
      requestUrl = `${requestUrl}&y=${requestParams.releaseDateQuery}`;
    }
    if (requestParams?.page) {
      requestUrl = `${requestUrl}&page=${requestParams.page}`;
    }

    let response: AxiosResponse = await axios.get(requestUrl);

    if (!response?.data.Error) {
      return response?.data || [];
    } else {
      console.error("Something went wrong");
    }
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
