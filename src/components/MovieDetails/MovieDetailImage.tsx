import React from "react";
import "./movie-detail.scss";

const MovieDetailImage = ({ title, imgUrl }: { title: string, imgUrl: any }) => {

  return (
    <div className="movie-image-container">
      <img className="movie-image" src={imgUrl} alt={title} />
    </div>
  );
};

export default MovieDetailImage;
