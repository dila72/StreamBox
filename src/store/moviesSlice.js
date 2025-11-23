import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tmdbAPI } from '../services/api';

// Async thunks
export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrending',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await tmdbAPI.getTrendingMovies(page);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await tmdbAPI.getPopularMovies(page);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMoviesByCategory = createAsyncThunk(
  'movies/fetchByCategory',
  async ({ category, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await tmdbAPI.getMoviesByCategory(category, page);
      return { category, data: response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchDetails',
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await tmdbAPI.getMovieDetails(movieId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchMovies = createAsyncThunk(
  'movies/search',
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await tmdbAPI.searchMovies(query, page);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  trending: {
    results: [],
    page: 1,
    totalPages: 0,
    isLoading: false,
    error: null,
  },
  popular: {
    results: [],
    page: 1,
    totalPages: 0,
    isLoading: false,
    error: null,
  },
  categories: {}, // Dynamic categories
  selectedMovie: null,
  searchResults: {
    results: [],
    query: '',
    page: 1,
    totalPages: 0,
    isLoading: false,
    error: null,
  },
  isLoading: false,
  error: null,
};

// Slice
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = initialState.searchResults;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch trending movies
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.trending.isLoading = true;
        state.trending.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trending.isLoading = false;
        state.trending.results = action.payload.results;
        state.trending.page = action.payload.page;
        state.trending.totalPages = action.payload.total_pages;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.trending.isLoading = false;
        state.trending.error = action.payload;
      })
      // Fetch popular movies
      .addCase(fetchPopularMovies.pending, (state) => {
        state.popular.isLoading = true;
        state.popular.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popular.isLoading = false;
        state.popular.results = action.payload.results;
        state.popular.page = action.payload.page;
        state.popular.totalPages = action.payload.total_pages;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.popular.isLoading = false;
        state.popular.error = action.payload;
      })
      // Fetch movies by category
      .addCase(fetchMoviesByCategory.pending, (state, action) => {
        const category = action.meta.arg.category;
        if (!state.categories[category]) {
          state.categories[category] = {
            results: [],
            page: 1,
            totalPages: 0,
            isLoading: false,
            error: null,
          };
        }
        state.categories[category].isLoading = true;
        state.categories[category].error = null;
      })
      .addCase(fetchMoviesByCategory.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.categories[category].isLoading = false;
        state.categories[category].results = data.results;
        state.categories[category].page = data.page;
        state.categories[category].totalPages = data.total_pages;
      })
      .addCase(fetchMoviesByCategory.rejected, (state, action) => {
        const category = action.meta.arg.category;
        state.categories[category].isLoading = false;
        state.categories[category].error = action.payload;
      })
      // Fetch movie details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.searchResults.isLoading = true;
        state.searchResults.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchResults.isLoading = false;
        state.searchResults.results = action.payload.results;
        state.searchResults.page = action.payload.page;
        state.searchResults.totalPages = action.payload.total_pages;
        state.searchResults.query = action.meta.arg.query;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.searchResults.isLoading = false;
        state.searchResults.error = action.payload;
      });
  },
});

export const { clearSelectedMovie, clearSearchResults, clearError } = moviesSlice.actions;
export default moviesSlice.reducer;
