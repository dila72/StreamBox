import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { storage } from '../services/storage';
import { STORAGE_KEYS } from '../utils/constants';

// Async thunks
export const loadFavorites = createAsyncThunk(
  'favorites/load',
  async (_, { rejectWithValue }) => {
    try {
      const favorites = await storage.get(STORAGE_KEYS.FAVORITES);
      return favorites || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToFavorites = createAsyncThunk(
  'favorites/add',
  async (movie, { getState, rejectWithValue }) => {
    try {
      const { favorites } = getState().favorites;
      const updatedFavorites = [...favorites, movie];
      await storage.save(STORAGE_KEYS.FAVORITES, updatedFavorites);
      return movie;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async (movieId, { getState, rejectWithValue }) => {
    try {
      const { favorites } = getState().favorites;
      const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
      await storage.save(STORAGE_KEYS.FAVORITES, updatedFavorites);
      return movieId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  favorites: [],
  isLoading: false,
  error: null,
};

// Slice
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favorites = [];
      storage.remove(STORAGE_KEYS.FAVORITES);
    },
  },
  extraReducers: (builder) => {
    builder
      // Load favorites
      .addCase(loadFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add to favorites
      .addCase(addToFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites.push(action.payload);
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Remove from favorites
      .addCase(removeFromFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = state.favorites.filter(
          movie => movie.id !== action.payload
        );
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectIsFavorite = (state, movieId) => {
  return state.favorites.favorites.some(movie => movie.id === movieId);
};

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
