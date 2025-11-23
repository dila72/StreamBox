/**
 * useMovies Hook
 * Custom hook for movie operations with memoization
 */

import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchMoviesByCategory,
  fetchMovieDetails,
  searchMovies,
  clearSearchResults,
} from '../../../store/moviesSlice';

export const useMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);

  const getTrending = useCallback(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  const getPopular = useCallback(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  const getTopRated = useCallback(() => {
    dispatch(fetchMoviesByCategory({ category: 'top_rated' }));
  }, [dispatch]);

  const getUpcoming = useCallback(() => {
    dispatch(fetchMoviesByCategory({ category: 'upcoming' }));
  }, [dispatch]);

  const getMovieDetails = useCallback((movieId) => {
    dispatch(fetchMovieDetails(movieId));
  }, [dispatch]);

  const search = useCallback((query) => {
    if (query.trim()) {
      dispatch(searchMovies(query));
    } else {
      dispatch(clearSearchResults());
    }
  }, [dispatch]);

  const clearSearch = useCallback(() => {
    dispatch(clearSearchResults());
  }, [dispatch]);

  // Memoized computed values
  const hasTrendingMovies = useMemo(() => (movies.trending?.results || []).length > 0, [movies.trending]);
  const hasSearchResults = useMemo(() => (movies.searchResults?.results || []).length > 0, [movies.searchResults]);

  return {
    trending: movies.trending?.results || [],
    popular: movies.popular?.results || [],
    topRated: movies.categories?.top_rated?.results || [],
    upcoming: movies.categories?.upcoming?.results || [],
    searchResults: movies.searchResults,
    currentMovie: movies.selectedMovie,
    isLoading: movies.trending?.isLoading || movies.popular?.isLoading || false,
    isSearching: movies.searchResults?.isLoading || false,
    error: movies.trending?.error || movies.popular?.error || null,
    searchQuery: movies.searchResults?.query || '',
    hasTrendingMovies,
    hasSearchResults,
    getTrending,
    getPopular,
    getTopRated,
    getUpcoming,
    getMovieDetails,
    search,
    clearSearch,
  };
};
