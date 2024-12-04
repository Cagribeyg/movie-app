import React, { useEffect, useState } from "react";
import MovieTable from "../../components/MovieTable/MovieTable";
import "../page.scss";
import MovieFilter from "../../components/MovieFilter/MovieFilter";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchMovies } from "../../features/movieSlice";

const LandingPage: React.FC = () => {
  const [searchName, setSearchName] = useState<string>("Pokemon");
  const [searchReleaseDate, setReleaseDate] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (searchName.length >= 3) {
      dispatch(fetchMovies(searchName));
    }
  }, [searchName, dispatch]);

  return (
    <div>
      <div className="landing-page-header">
        <p>Movies List</p>
      </div>
      <MovieFilter
        searchName={searchName}
        setSearchName={setSearchName}
        searchReleaseDate={searchReleaseDate}
        setReleaseDate={setReleaseDate}
      />
      <MovieTable />
    </div>
  );
};

export default LandingPage;
