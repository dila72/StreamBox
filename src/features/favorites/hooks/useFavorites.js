/**
 * useFavorites Hook
 * Custom hook for favorites management with optimistic updates
 */

import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites as addFavoriteAction, removeFromFavorites as removeFavoriteAction } from '../../../store/favoritesSlice';

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const addToFavorites = useCallback((movie) => {
    dispatch(addFavoriteAction(movie));
  }, [dispatch]);

  const removeFromFavorites = useCallback((movieId) => {
    dispatch(removeFavoriteAction(movieId));
  }, [dispatch]);

  const toggleFavorite = useCallback((movie) => {
    const favList = favorites.favorites || [];
    const isFav = favList.some((fav) => fav.id === movie.id);
    if (isFav) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }, [favorites.favorites, addToFavorites, removeFromFavorites]);

  const isFavorite = useCallback((movieId) => {
    const favList = favorites.favorites || [];
    return favList.some((fav) => fav.id === movieId);
  }, [favorites.favorites]);

  // Memoized computed values
  const favoritesCount = useMemo(() => (favorites.favorites || []).length, [favorites.favorites]);
  const hasFavorites = useMemo(() => (favorites.favorites || []).length > 0, [favorites.favorites]);

  return {
    favorites: favorites.favorites || [],
    isLoading: favorites.isLoading,
    error: favorites.error,
    favoritesCount,
    hasFavorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  };
};
