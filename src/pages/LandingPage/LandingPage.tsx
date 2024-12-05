import React, { useEffect, useState } from "react";
import MovieTable from "../../components/MovieTable/MovieTable";
import "../page.scss";
import MovieFilter from "../../components/MovieFilter/MovieFilter";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { RequestParamsInterface } from "../../interfaces/interfaces";
import dayjs from "dayjs";
import { AppDispatch } from "../../redux/store";
import { fetchMovies } from "../../redux/actions/movieActions";
import { MINIMUM_NAME_KEYWORD_LENGTH } from "../../constants/constant";

const LandingPage: React.FC = () => {
  const [searchName, setSearchName] = useState<string>("Pokemon");
  const [searchReleaseDate, setReleaseDate] = useState<any>(dayjs(Date.now()));

  const dispatch = useDispatch<AppDispatch>();

  const { state } = useLocation();

  // This useEffect used for after navigating back button, setting the state of selected name and release date
  useEffect(() => {
    if (state?.searchParams) {
      const { searchParams } = state;
      setSearchName(searchParams.searchName);
      if (searchParams?.searchReleaseDate) {
        const selectedYear = searchParams?.searchReleaseDate["$y"];
        setReleaseDate(dayjs(new Date(selectedYear, 0)));
      } else {
        setReleaseDate(null);
      }
    }
  }, [state]);

  // This useEffect used for fetching the movie data
  useEffect(() => {
    if (searchName.length > MINIMUM_NAME_KEYWORD_LENGTH) {
      let requestParams!: RequestParamsInterface;
      // Request for if only name typed
      if (!searchReleaseDate) {
        requestParams = {
          nameQuery: searchName,
        };
      } else {
        // Request for both name and release date
        const dateValue = searchReleaseDate["$y"];
        requestParams = {
          nameQuery: searchName,
          releaseDateQuery: dateValue,
        };
      }
      dispatch(fetchMovies(requestParams));
    }
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
