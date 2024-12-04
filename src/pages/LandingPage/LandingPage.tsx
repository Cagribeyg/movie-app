import React, { useEffect, useState } from "react";
import MovieTable from "../../components/MovieTable/MovieTable";
import "../page.scss";
import MovieFilter from "../../components/MovieFilter/MovieFilter";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchMovies } from "../../slice/movieSlice";
import { useLocation } from "react-router-dom";
import { RequestParamsInterface } from "../../interfaces/interfaces";
import dayjs from "dayjs";

const LandingPage: React.FC = () => {
  const [searchName, setSearchName] = useState<string>("Pokemon");
  const [searchReleaseDate, setReleaseDate] = useState<any>(dayjs(Date.now()));

  const dispatch = useDispatch<AppDispatch>();

  const { state } = useLocation();

  useEffect(() => {
    // This useEffect used for after navigating back button, setting the state of selected name and release date
    if (state?.searchParams) {
      const { searchParams } = state;
      setSearchName(searchParams.searchName);
      if (searchParams?.searchReleaseDate) {
        const selectedYear = searchParams?.searchReleaseDate["$y"];
        setReleaseDate(dayjs(new Date(selectedYear, 0)));
      }
    }
  }, [state]);

  useEffect(() => {
    var requestParams!: RequestParamsInterface;
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
