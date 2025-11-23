/**
 * useFavorites Hook
 * Custom hook for favorites management with optimistic updates
 */

import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../../store/favoritesSlice';

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const addToFavorites = useCallback((movie) => {
    dispatch(addFavorite(movie));
  }, [dispatch]);

  const removeFromFavorites = useCallback((movieId) => {
    dispatch(removeFavorite(movieId));
  }, [dispatch]);

  const toggleFavorite = useCallback((movie) => {
    const isFavorite = favorites.items.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }, [favorites.items, addToFavorites, removeFromFavorites]);

  const isFavorite = useCallback((movieId) => {
    return favorites.items.some((fav) => fav.id === movieId);
  }, [favorites.items]);

  // Memoized computed values
  const favoritesCount = useMemo(() => favorites.items.length, [favorites.items]);
  const hasFavorites = useMemo(() => favorites.items.length > 0, [favorites.items]);

  return {
    favorites: favorites.items,
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
