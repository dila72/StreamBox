import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { searchMovies, clearSearchResults } from '../../store/moviesSlice';
import SearchBar from '../../components/SearchBar';
import MovieCard from '../../components/MovieCard';
import { useTheme } from '../../hooks/useTheme';

export default function SearchScreen({ navigation }) {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const colors = theme.colors;
  const { searchResults } = useSelector((state) => state.movies);
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(searchMovies({ query }));
    }
  };

  const handleClear = () => {
    setQuery('');
    dispatch(clearSearchResults());
  };

  // Ensure searchResults has the correct structure
  const results = searchResults?.results || [];
  const isSearching = searchResults?.isLoading || false;
  
  // Only show results if there's an active query
  const shouldShowResults = query.trim().length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Search Movies</Text>
      </View>
      
      <SearchBar value={query} onChangeText={setQuery} onSearch={handleSearch} />

      {!shouldShowResults ? (
        <View style={styles.center}>
          <Feather name="film" size={64} color={colors.textSecondary} />
          <Text style={[styles.message, { color: colors.textSecondary }]}>Search for movies</Text>
        </View>
      ) : isSearching ? (
        <View style={styles.center}>
          <Text style={[styles.message, { color: colors.textSecondary }]}>Searching...</Text>
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <MovieCard movie={item} onPress={() => navigation.navigate('Details', { movieId: item.id })} />
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.center}>
          <Feather name="search" size={64} color={colors.textSecondary} />
          <Text style={[styles.message, { color: colors.textSecondary }]}>No results found</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1 },
  title: { fontSize: 28, fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  message: { fontSize: 16, marginTop: 16 },
  listContent: { padding: 16 },
  row: { justifyContent: 'space-between' },
  cardWrapper: { flex: 1, marginBottom: 16 },
});