import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import MovieDetailHeader from "./MovieDetailHeader";
import MovieDetailImage from "./MovieDetailImage";
import MovieDetailInfo from "./MovieDetailInfo";
import { CircularProgress } from "@mui/material";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchMovieDetails } from "../../redux/actions/movieActions";

const MovieDetails: React.FC = () => {
  // Get imdbID for fetching the movie details
  const { imdbID } = useParams<{ imdbID: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const selectedMovieDetail = useSelector(
    (state: RootState) => state.movies.selectedMovie
  );

  // state used for navigation
  const { state } = useLocation();

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovieDetails(imdbID));
    }
  }, [dispatch, imdbID]);

  return (
    <div>
      {selectedMovieDetail ? (
        <div className="movie-detail-container">
          <MovieDetailHeader
            title={selectedMovieDetail.Title}
            searchParams={state}
          />
          <div className="movie-detail">
            <MovieDetailImage
              title={selectedMovieDetail.Title}
              imgUrl={selectedMovieDetail.Poster}
            />
            <MovieDetailInfo
              director={selectedMovieDetail.Director}
              genre={selectedMovieDetail.Genre}
              actors={selectedMovieDetail.Actors}
              imdbRating={selectedMovieDetail.imdbRating}
              plot={selectedMovieDetail.Plot}
            />
          </div>
        </div>
      ) : (
        <div className="loading-container">
          <CircularProgress style={{ position: "absolute" }} color="success" />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
