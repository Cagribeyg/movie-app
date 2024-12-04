import React, { useEffect, useState } from "react";
import MovieTable from "../../components/MovieTable/MovieTable";
import "../page.scss";
import MovieFilter from "../../components/MovieFilter/MovieFilter";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchMovies } from "../../slice/movieSlice";
import { useLocation } from "react-router-dom";
import { requestParamsInterface } from "../../interfaces/interfaces";

const LandingPage: React.FC = () => {
  const [searchName, setSearchName] = useState<string>("Pokemon");
  const [searchReleaseDate, setReleaseDate] = useState<any>();

  const dispatch = useDispatch<AppDispatch>();

  const { state } = useLocation();
  console.log("state", state);

  useEffect(() => {
    if (state?.searchParams) {
      const { searchParams } = state;
      setSearchName(searchParams.searchName);
      // setReleaseDate(searchParams.searchReleaseDate);
    }
  }, [state]);

  useEffect(() => {
    var requestParams!: requestParamsInterface;
    // Request for if only name typed
    if (!searchReleaseDate) {
      if (searchName.length >= 3) {
        requestParams = {
          nameQuery: searchName,
        };
      }
    } else {
      // Request for both name and release date
      if (searchName.length >= 3) {
        const dateValue = searchReleaseDate["$y"];
        requestParams = {
          nameQuery: searchName,
          releaseDateQuery: dateValue,
        };
      }
    }
    dispatch(fetchMovies(requestParams));
  }, [searchReleaseDate, dispatch, searchName]);

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
      <MovieTable
        searchName={searchName}
        searchReleaseDate={searchReleaseDate}
      />
    </div>
  );
};

export default LandingPage;
