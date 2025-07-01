import { useAppDispatch, useAppSelector } from "../../context/store";
import { addToFav, deleteFav } from "../../features/moviesSlice";
import type { Movie } from "../../types/movie";
import { FavIcon } from "../FavIcon/FavIcon";
import styles from './MovieCard.module.scss';

type Props = {
  movie: Movie;
}

export const MovieCard: React.FC<Props> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.moviesState.favorites);
  const displayedActors = movie.actors?.slice(0, 3);
  const showDots = movie.actors?.length > 3;
  const active = favorites.find(m => m.title.toLowerCase() === movie.title.toLowerCase())

  function handleFavClick() {
    if (active) {
      dispatch(deleteFav(active.id));
    } else {
      dispatch(addToFav(movie as Movie));
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.card__top}>
        <h2 className={styles.card__title}>{movie.title}</h2>
        <div onClick={handleFavClick}>
          <FavIcon active={active ? true : false} />
        </div>
      </div>
      <div>
        <p className={styles.card__info}><strong>Year:</strong> {movie.year}</p>
        <p className={styles.card__info}><strong>Format:</strong> {movie.format}</p>
        <p className={styles.card__info}>
          <strong>Stars:</strong> {displayedActors?.join(', ')}{showDots && '...'}
        </p>
      </div>
    </div>
  );
}