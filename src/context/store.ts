import { configureStore } from "@reduxjs/toolkit";
import { moviesReducer, type MoviesState } from "../features/moviesSlice";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

type PreloadedState = {
  moviesState: MoviesState;
}

const loadedState: PreloadedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState')!)
  : undefined

export const store = configureStore({
  reducer: {
    moviesState: moviesReducer,
  },
  preloadedState: loadedState,
})

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
