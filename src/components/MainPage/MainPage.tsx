import React from "react";
import { useAppSelector } from "../../context/store";
import { MoviesList } from "../MoviesList/MoviesList";

export const MainPage: React.FC = () => {
  const movies = useAppSelector(state => state.moviesState.movies) || [];

  return (
    <>
      {movies.length > 0 ? (
          <MoviesList movies={movies} />
      ) : (
        <p>No movies loaded...</p>
      )}
    </>
  );
}