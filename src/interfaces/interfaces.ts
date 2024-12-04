export interface RequestParamsInterface {
  releaseDateQuery?: number | null;
  nameQuery: string;
}

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster?: string;
  [key: string]: any;
}

export interface MoviesState {
  movies: Movie[];
  status: "idle" | "loading" | "failed";
  selectedMovie: Movie | null;
}
