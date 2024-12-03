import React from "react";
import "./movie-detail.scss";

const MovieDetailInfo = ({ director, genre, actors, imdbRating, plot }: { director: string, genre: any, actors: string, imdbRating:string, plot: string }) => {

  return (
    <div className="movie-detail-info-container">
      <p><strong>Genre:</strong> {genre}</p>
      <p><strong>Director:</strong> {director}</p>
      <p><strong>Cast:</strong> {actors}</p>
      <p><strong>IMDb Rating:</strong> {imdbRating}</p>
      <p><strong>Plot:</strong> {plot}</p>
    </div>
  );
};

export default MovieDetailInfo;
