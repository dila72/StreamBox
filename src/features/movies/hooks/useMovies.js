/**
 * useMovies Hook
 * Custom hook for movie operations with memoization
 */

import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
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
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);

  const getUpcoming = useCallback(() => {
    dispatch(fetchUpcomingMovies());
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
  const hasTrendingMovies = useMemo(() => movies.trending.length > 0, [movies.trending]);
  const hasSearchResults = useMemo(() => movies.searchResults.length > 0, [movies.searchResults]);

  return {
    trending: movies.trending,
    popular: movies.popular,
    topRated: movies.topRated,
    upcoming: movies.upcoming,
    searchResults: movies.searchResults,
    currentMovie: movies.currentMovie,
    isLoading: movies.isLoading,
    isSearching: movies.isSearching,
    error: movies.error,
    searchQuery: movies.searchQuery,
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
