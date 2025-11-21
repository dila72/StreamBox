import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MovieCard from '../../components/MovieCard';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { colors } = useSelector((state) => state.theme);
  const { favorites } = useSelector((state) => state.favorites);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Favorites</Text>
        <Feather name="heart" size={24} color={colors.primary} />
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyState}>
          <Feather name="heart" size={64} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No favorites yet</Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>Start adding movies to your favorites!</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <MovieCard movie={item} onPress={() => navigation.navigate('Home', { screen: 'Details', params: { movieId: item.id } })} />
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1 },
  title: { fontSize: 28, fontWeight: 'bold' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  emptyText: { fontSize: 18, fontWeight: '600', marginTop: 16 },
  emptySubtext: { fontSize: 14, marginTop: 8, textAlign: 'center' },
  listContent: { padding: 16 },
  row: { justifyContent: 'space-between' },
  cardWrapper: { flex: 1, marginBottom: 16 },
});