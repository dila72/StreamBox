import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { fetchMovieDetails } from '../../store/moviesSlice';
import { addToFavorites, removeFromFavorites, selectIsFavorite } from '../../store/favoritesSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from '../../utils/constants';
import { useTheme } from '../../hooks/useTheme';

export default function DetailsScreen({ route, navigation }) {
  const { movieId } = route.params;
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const colors = theme.colors;
  const { selectedMovie, isLoading } = useSelector((state) => state.movies);
  const isFavorite = useSelector((state) => selectIsFavorite(state, movieId));

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
  }, [movieId]);

  if (isLoading || !selectedMovie) {
    return <LoadingSpinner />;
  }

  const posterUrl = selectedMovie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.POSTER_LARGE}${selectedMovie.poster_path}`
    : 'https://via.placeholder.com/500x750/1e293b/ffffff?text=No+Image';

  const backdropUrl = selectedMovie.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.BACKDROP_LARGE}${selectedMovie.backdrop_path}`
    : null;

  const trailer = selectedMovie.videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movieId));
    } else {
      dispatch(addToFavorites(selectedMovie));
    }
  };

  const openTrailer = () => {
    if (trailer) {
      Linking.openURL(`https://www.youtube.com/watch?v=${trailer.key}`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        {/* Backdrop */}
        {backdropUrl && <Image source={{ uri: backdropUrl }} style={styles.backdrop} />}

        {/* Back Button */}
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.overlay }]} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.posterRow}>
            <Image source={{ uri: posterUrl }} style={styles.poster} />
            <View style={styles.info}>
              <Text style={[styles.title, { color: colors.text }]}>{selectedMovie.title || selectedMovie.name}</Text>
              <View style={styles.metaRow}>
                <View style={styles.rating}>
                  <Feather name="star" size={16} color={colors.rating} />
                  <Text style={[styles.ratingText, { color: colors.text }]}>{selectedMovie.vote_average?.toFixed(1)}</Text>
                </View>
                <Text style={[styles.year, { color: colors.textSecondary }]}>{selectedMovie.release_date?.split('-')[0] || selectedMovie.first_air_date?.split('-')[0]}</Text>
              </View>
              {selectedMovie.runtime && (
                <Text style={[styles.runtime, { color: colors.textSecondary }]}>{Math.floor(selectedMovie.runtime / 60)}h {selectedMovie.runtime % 60}m</Text>
              )}
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]} onPress={handleFavoriteToggle}>
              <Feather name={isFavorite ? 'heart' : 'heart'} size={20} color="#fff" fill={isFavorite ? '#fff' : 'none'} />
              <Text style={styles.actionText}>{isFavorite ? 'Remove' : 'Favorite'}</Text>
            </TouchableOpacity>
            {trailer && (
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.secondary }]} onPress={openTrailer}>
                <Feather name="play" size={20} color="#fff" />
                <Text style={styles.actionText}>Trailer</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Genres */}
          {selectedMovie.genres && (
            <View style={styles.genresContainer}>
              {selectedMovie.genres.map((genre) => (
                <View key={genre.id} style={[styles.genreChip, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <Text style={[styles.genreText, { color: colors.text }]}>{genre.name}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Overview */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
            <Text style={[styles.overview, { color: colors.textSecondary }]}>{selectedMovie.overview || 'No overview available.'}</Text>
          </View>

          {/* Cast */}
          {selectedMovie.credits?.cast && selectedMovie.credits.cast.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Cast</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {selectedMovie.credits.cast.slice(0, 10).map((actor) => (
                  <View key={actor.id} style={[styles.castCard, { backgroundColor: colors.card }]}>
                    <Image
                      source={{
                        uri: actor.profile_path
                          ? `${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.PROFILE}${actor.profile_path}`
                          : 'https://via.placeholder.com/185x278/1e293b/ffffff?text=No+Image',
                      }}
                      style={styles.castImage}
                    />
                    <Text style={[styles.castName, { color: colors.text }]} numberOfLines={1}>{actor.name}</Text>
                    <Text style={[styles.castCharacter, { color: colors.textSecondary }]} numberOfLines={1}>{actor.character}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backdrop: { width: '100%', height: 250, resizeMode: 'cover' },
  backButton: { position: 'absolute', top: 50, left: 16, padding: 12, borderRadius: 24, zIndex: 10 },
  content: { padding: 20, marginTop: -50 },
  posterRow: { flexDirection: 'row', marginBottom: 20 },
  poster: { width: 120, height: 180, borderRadius: 12, marginRight: 16 },
  info: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 16 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 14, fontWeight: '600' },
  year: { fontSize: 14 },
  runtime: { fontSize: 14 },
  actions: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8 },
  actionText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  genresContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  genreChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1 },
  genreText: { fontSize: 12 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  overview: { fontSize: 14, lineHeight: 22 },
  castCard: { width: 100, marginRight: 12, borderRadius: 8, overflow: 'hidden' },
  castImage: { width: 100, height: 150, resizeMode: 'cover' },
  castName: { fontSize: 12, fontWeight: '600', padding: 8, paddingBottom: 4 },
  castCharacter: { fontSize: 11, paddingHorizontal: 8, paddingBottom: 8 },
});