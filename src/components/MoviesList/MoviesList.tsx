import { useSearchParams } from "react-router-dom";
import type { Movie } from "../../types/movie";
import { MovieCard } from "../MovieCard/MovieCard"
import styles from './MoviesList.module.scss';
import type { MovieServer } from "../../types/movieServer";
import { useAppSelector } from "../../context/store";

type Props = {
  movies: Movie[] | MovieServer[];
}

export const MoviesList: React.FC<Props> = ({ movies }) => {
  const [searchParams,] = useSearchParams();
  const localMovies = useAppSelector(state => state.moviesState.movies) || [];
  const query = searchParams.get('query') || '';
  const searchBy = searchParams.get('searchBy') || '';
  const sortedMovies = [...movies].sort((m1, m2) => m1.title.toLowerCase().localeCompare(m2.title.toLowerCase()));
  const filteredmovies = sortedMovies.filter(m1 => {
      const actorNames = localMovies.find(m => m.title === m1.title)?.actors || [];
      const matchesTitle = m1.title.toLowerCase().includes(query.toLowerCase());
      const matchesActor = actorNames.some((actor) =>
        actor.toLowerCase().includes(query.toLowerCase())
      );
      if (searchBy === 'title') return matchesTitle;
      if (searchBy === 'actor') return matchesActor;

      return matchesTitle;
    })

  return (
    <div className={styles['movies-list']}>
      {filteredmovies.map(movie => (
        <div className={styles['movies-list__movie']} key={movie.title}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  )
}