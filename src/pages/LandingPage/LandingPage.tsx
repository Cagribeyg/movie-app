import React from "react";
import MovieTable from "../../components/MovieTable/MovieTable";
import "../page.scss";

const LandingPage: React.FC = () => {
  return (
    <div>
      <div className="landing-page-header">
        <p >Movies List</p>
      </div>
      <MovieTable />
    </div>
  );
};

export default LandingPage;
