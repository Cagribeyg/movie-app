import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../features/movieSlice";
import { AppDispatch, RootState } from "../../store/store";
import MovieDetailHeader from "./MovieDetailHeader";
import MovieDetailImage from "./MovieDetailImage";
import MovieDetailInfo from "./MovieDetailInfo";

const MovieDetails: React.FC = () => {
  // Get imdbID for fetching the details
  const { imdbID } = useParams<{ imdbID: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const movieDetail = useSelector(
    (state: RootState) => state.movies.selectedMovie
  );

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovieDetails(imdbID));
    }
  }, [dispatch, imdbID]);

  return (
    <div>
      {movieDetail ? (
        <div className="movie-detail-container">
          <MovieDetailHeader title={movieDetail.Title} />
          <div className="movie-detail">
            <MovieDetailImage
              title={movieDetail.Title}
              imgUrl={movieDetail.Poster}
            />
            <MovieDetailInfo
              director={movieDetail.Director}
              genre={movieDetail.Genre}
              actors={movieDetail.Actors}
              imdbRating={movieDetail.imdbRating}
              plot={movieDetail.Plot}
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
