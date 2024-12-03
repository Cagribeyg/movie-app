import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY, BASE_URL, dummyData } from '../constants/constant';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster?: string;
  [key: string]: any;
}

interface MoviesState {
  movies: Movie[];
  status: 'idle' | 'loading' | 'failed';
  selectedMovie: Movie | null;
}

const initialState: MoviesState = {
  movies: [],
  status: 'idle',
  selectedMovie: null,
};


// Create Redux async thunk actions to http requests
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (query: string) => {
    // TODO 
    // const response = await axios.get(`https://www.omdbapi.com/?apikey=721b9206&s=Pokemon`);
    return dummyData;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (imdbID: string) => {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`);
    return response.data;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'idle';
        state.movies = action.payload;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.selectedMovie = action.payload;
      });
  },
});

export default moviesSlice.reducer;