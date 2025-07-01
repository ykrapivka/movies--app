import { useAppSelector } from "../../context/store"
import { MoviesList } from "../MoviesList/MoviesList"

export const Favorites: React.FC = () => {
  const favoriteMovies = useAppSelector(state => state.moviesState.favorites);

  return (
    <>
      {favoriteMovies.length > 0 ? (
        <MoviesList movies={favoriteMovies}  />
      ) : (
        <p>No favotire movies yet...</p>
      )}
    </>
  )
}