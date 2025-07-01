import styles from './App.module.scss';
import { MoviesInput } from './components/MoviesInput/MoviesInput';
import { Nav } from './components/Nav/Nav';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './context/store';
import { useEffect } from 'react';
import { loadMovies } from './features/moviesSlice';
import { Loader } from './components/Loader/Loader';

function App() {
  const dispatch = useAppDispatch();
  const loaded = useAppSelector(state => state.moviesState.loaded);
  
  useEffect(() => {
    dispatch(loadMovies())
  }, [dispatch])

  return (
    <>
    <div className={styles.main}>
      <MoviesInput />
      <Nav />
      {loaded ? <div className={styles.main}>
        <Outlet />
      </div>
      :
      <Loader />
      }
    </div>
    </>
  )
}

export default App
