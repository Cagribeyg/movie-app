import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../features/movieSlice";
import { AppDispatch, RootState } from "../../store/store";
import MovieDetailHeader from "./MovieDetailHeader";
import MovieDetailImage from "./MovieDetailImage";
import MovieDetailInfo from "./MovieDetailInfo";

const MovieDetails: React.FC = () => {
  // Get imdbID for fetching the movie details
  const { imdbID } = useParams<{ imdbID: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const selectedMovieDetail = useSelector(
    (state: RootState) => state.movies.selectedMovie
  );

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovieDetails(imdbID));
    }
  }, [dispatch, imdbID]);

  return (
    <div>
      {selectedMovieDetail ? (
        <div className="movie-detail-container">
          <MovieDetailHeader title={selectedMovieDetail.Title} />
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
        <div>Movie details is loading.</div>
      )}
    </div>
  );
};

export default MovieDetails;
