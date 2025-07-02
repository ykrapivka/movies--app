import { Link, useLocation, useSearchParams } from 'react-router-dom';
import styles from './Nav.module.scss';
import { useAppSelector } from '../../context/store';
import IconNumber from '../IconNumber';
import classNames from 'classnames';
import { FavIcon } from '../FavIcon/FavIcon';


export const Nav: React.FC = () => {
  const favorites = useAppSelector(state => state.moviesState.favorites) || [];
  const location = useLocation();
  const [type = ''] = location.pathname.split('/').filter(item => item !== '');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const searchBy = searchParams.get('searchBy') || '';

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    const value = e.target.value;
    if (value.trim() === "") {
      newParams.delete('query');
    } else {
      newParams.set('query', value);
    }

    setSearchParams(newParams);
  };

  const setSearchBy = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('searchBy', value);

    setSearchParams(newParams);
  }

  return (
    <div className={styles.nav}>
      <Link
        to="/"
        className={classNames(styles.nav__icon, {
          [styles['nav__icon--active']]: type === '',
        })}
      >
        HOME
      </Link>
      <Link
        to="/favorites"
        className={classNames(styles.nav__icon, {
          [styles['nav__icon--active']]: type === 'favorites',
        })}
      >
        <FavIcon active={false} />
        {favorites.length > 0 && <IconNumber items={favorites.length} />}
      </Link>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleQuery}
        className={styles.nav__searchInput}
      />
      <select
        value={searchBy}
        onChange={(e) => setSearchBy(e.target.value as 'title' | 'actor')}
        className={styles.select}
      >
        <option value="title">by Title</option>
        <option value="actor">by Actor</option>
      </select>
    </div>
  )
}