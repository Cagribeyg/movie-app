import React from "react";
import "./movie-detail.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const MovieDetailHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  const backToPreviousPage = () => {
    navigate(-1)
  };

  return (
    <div className="title">
      <ArrowBackIcon
        onClick={backToPreviousPage}
        className="backIcon"
        sx={{ fontSize: 40 }}
      />
      <p>{title}</p>
    </div>
  );
};

export default MovieDetailHeader;
