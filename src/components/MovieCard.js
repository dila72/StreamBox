import React, { memo, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { API_CONFIG } from '../config/env';
import { useTheme } from '../hooks/useTheme';
import { useFavorites } from '../features/favorites/hooks/useFavorites';

const MovieCard = memo(({ movie, onPress }) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const isMovieFavorite = isFavorite(movie.id);

  const imageUrl = movie.poster_path
    ? `${API_CONFIG.TMDB.IMAGE_BASE_URL}/${API_CONFIG.TMDB.IMAGE_SIZES.POSTER.MEDIUM}${movie.poster_path}`
    : 'https://via.placeholder.com/342x513/1e293b/ffffff?text=No+Image';

  const handleFavoriteToggle = useCallback((e) => {
    e.stopPropagation();
    toggleFavorite(movie);
  }, [movie, toggleFavorite]);

  const handlePress = useCallback(() => {
    onPress?.(movie);
  }, [movie, onPress]);

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.card }]} 
      onPress={handlePress} 
      activeOpacity={0.7}
    >
      <Image source={{ uri: imageUrl }} style={styles.poster} />
      <TouchableOpacity 
        style={[styles.favoriteButton, { backgroundColor: colors.background + 'CC' }]} 
        onPress={handleFavoriteToggle}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Feather 
          name="heart" 
          size={20} 
          color={isMovieFavorite ? colors.primary : colors.textSecondary} 
          fill={isMovieFavorite ? colors.primary : 'transparent'} 
        />
      </TouchableOpacity>
      
      {/* Rating Badge */}
      {movie.vote_average > 0 && (
        <View style={[styles.ratingBadge, { backgroundColor: colors.background + 'CC' }]}>
          <Feather name="star" size={12} color={colors.rating} />
          <Text style={[styles.ratingText, { color: colors.text }]}>
            {movie.vote_average?.toFixed(1)}
          </Text>
        </View>
      )}
      
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {movie.title || movie.name}
        </Text>
        <View style={styles.meta}>
          <Feather name="calendar" size={12} color={colors.textSecondary} />
          <Text style={[styles.year, { color: colors.textSecondary }]}>
            {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0] || 'N/A'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

MovieCard.displayName = 'MovieCard';

const styles = StyleSheet.create({
  card: { 
    width: 160, 
    marginRight: 16, 
    borderRadius: 12, 
    overflow: 'hidden', 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84 
  },
  poster: { width: '100%', height: 240, resizeMode: 'cover', backgroundColor: '#1e293b' },
  favoriteButton: { 
    position: 'absolute', 
    top: 8, 
    right: 8, 
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  info: { padding: 12 },
  title: { fontSize: 14, fontWeight: '600', marginBottom: 6, lineHeight: 18 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  year: { fontSize: 12 },
});

export default MovieCard;
