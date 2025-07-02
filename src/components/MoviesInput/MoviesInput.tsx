import { useAppDispatch, useAppSelector } from "../../context/store";
import { clearMovies, setLoaded, uploadMoviesTxt } from "../../features/moviesSlice";
import type { Movie } from "../../types/movie";
import styles from './MoviesInput.module.scss';

export const MoviesInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(state => state.moviesState.movies) || [];
  const handleClearMovies = () => {
    dispatch(clearMovies())
    return;
  };
  const parseMoviesFromText = async (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLoaded(false));
    const movies: Movie[] = [];
    const file = e.target.files?.[0];

    if (!file) return;

    const text = await file.text();
    const normalizedText = text.replace(/\r\n/g, '\n');
    const moviesBlocks = normalizedText.split('\n\n');

    moviesBlocks.forEach(block => {
      const lines = block.trim().split('\n');
      if (lines.length < 4) return;

      const title = lines[0].replace('Title: ', '').trim();
      const year = +lines[1].replace('Release Year: ', '').trim();
      const format = lines[2].replace('Format: ', '').trim();
      const actors = lines[3].replace('Stars: ', '').split(', ').map(actor => actor.trim());

      movies.push({ title, year, format, actors });
    });

    dispatch(uploadMoviesTxt(movies));
    setTimeout(() => {
      dispatch(setLoaded(true));
    }, 2000);
};

  return (
    <>
      <div className={styles.actions}>
        <label htmlFor="file-upload" className={styles.actions__input}>
          📁 Upload .txt File
        </label>
        <input
            id="file-upload"
            type="file"
            accept="text/plain"
            onChange={e => parseMoviesFromText(e)}
            style={{ display: 'none' }} />
        <button
          onClick={handleClearMovies}
          disabled={movies.length === 0}
          className={styles.actions__clear}
        >
          Clear Movies
        </button>
      </div>
    </>
  );
}

