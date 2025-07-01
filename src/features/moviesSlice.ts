import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Movie } from "../types/movie"
import { API_URL, token } from "../api/movies";
import type { MovieServer } from "../types/movieServer";

export type MoviesState = {
  movies: Movie[];
  favorites: MovieServer[];
  loaded: boolean;
  hasError: string;
};

const initialState: MoviesState = {
  movies: [],
  favorites: [],
  loaded: true,
  hasError: '',
};

export const loadMovies = createAsyncThunk('movies/loadMovies', async () => {
  const res = await fetch(`${API_URL}/movies`, {
    headers: {
      'Authorization': token,
    }
  });
  return res.json();
});

export const deleteFav = createAsyncThunk('movies/deleteMovie', async (id: number) => {
  const res = await fetch(`${API_URL}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token,
      },
    });

  if (!res.ok) {
    throw new Error('Something went wrong deleting a movie')
  }

  return id;
})

export const addToFav = createAsyncThunk('movies/addToFav', async (movie: Movie) => {
  const res = await fetch(`${API_URL}/movies`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });

  if (!res.ok) {
    throw new Error('Something went wrong adding a movie')
  }

  return res.json();
})

export const mosivesSlice = createSlice({
  name: 'movies',
  initialState: initialState,
  reducers: {
    uploadMoviesTxt: (state, action) => {
      state.movies = action.payload;
    },
    clearMovies: (state) => {
      state.movies = [];
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadMovies.fulfilled, (state, action) => {
      state.favorites = action.payload.data
    })
    builder.addCase(addToFav.fulfilled, (state, action) => {
      state.favorites.push(action.payload.data);
    })
    builder.addCase(deleteFav.fulfilled, (state, action) => {
      state.favorites = state.favorites.filter(m => m.id !== action.payload);
    })
  }
});

export const moviesReducer = mosivesSlice.reducer;
export const {uploadMoviesTxt, clearMovies, setLoaded} = mosivesSlice.actions;
