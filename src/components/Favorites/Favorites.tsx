import { useAppSelector } from "../../context/store"
import { MoviesList } from "../MoviesList/MoviesList"

export const Favorites: React.FC = () => {
  const favoriteMovies = useAppSelector(state => state.moviesState.favorites);

  return (
    <MoviesList movies={favoriteMovies}  />
  )
}