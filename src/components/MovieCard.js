import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites, selectIsFavorite } from '../store/favoritesSlice';
import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from '../utils/constants';

export default function MovieCard({ movie, onPress }) {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.theme);
  const isFavorite = useSelector((state) => selectIsFavorite(state, movie.id));

  const imageUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.POSTER_MEDIUM}${movie.poster_path}`
    : 'https://via.placeholder.com/342x513/1e293b/ffffff?text=No+Image';

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.card }]} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: imageUrl }} style={styles.poster} />
      <TouchableOpacity style={[styles.favoriteButton, { backgroundColor: colors.overlay }]} onPress={handleFavoriteToggle}>
        <Feather name={isFavorite ? 'heart' : 'heart'} size={20} color={isFavorite ? colors.primary : colors.text} fill={isFavorite ? colors.primary : 'none'} />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{movie.title || movie.name}</Text>
        <View style={styles.meta}>
          <View style={styles.rating}>
            <Feather name="star" size={14} color={colors.rating} />
            <Text style={[styles.ratingText, { color: colors.text }]}>{movie.vote_average?.toFixed(1) || 'N/A'}</Text>
          </View>
          <Text style={[styles.year, { color: colors.textSecondary }]}>{movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0] || 'N/A'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { width: 150, marginRight: 16, borderRadius: 12, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  poster: { width: '100%', height: 225, resizeMode: 'cover' },
  favoriteButton: { position: 'absolute', top: 8, right: 8, padding: 8, borderRadius: 20 },
  info: { padding: 12 },
  title: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  meta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 12, fontWeight: '500' },
  year: { fontSize: 12 },
});