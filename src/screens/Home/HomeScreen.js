import React, { useEffect } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { fetchTrendingMovies, fetchPopularMovies } from '../../store/moviesSlice';
import MovieCard from '../../components/MovieCard';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);
  const { trending, popular, isLoading } = useSelector((state) => state.movies);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = () => {
    dispatch(fetchTrendingMovies());
    dispatch(fetchPopularMovies());
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMovies();
    setRefreshing(false);
  };

  if (isLoading && !trending.length && !popular.length) {
    return <LoadingSpinner />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>Welcome back,</Text>
            <Text style={[styles.userName, { color: colors.text }]}>{user?.firstName || 'User'}!</Text>
          </View>
          <Feather name="film" size={32} color={colors.primary} />
        </View>

        {/* Trending Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Trending Now</Text>
            <Feather name="trending-up" size={20} color={colors.primary} />
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={trending}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MovieCard movie={item} onPress={() => navigation.navigate('Details', { movieId: item.id })} />
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* Popular Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Movies</Text>
            <Feather name="star" size={20} color={colors.rating} />
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popular}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MovieCard movie={item} onPress={() => navigation.navigate('Details', { movieId: item.id })} />
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60, borderBottomWidth: 1 },
  greeting: { fontSize: 14 },
  userName: { fontSize: 24, fontWeight: 'bold', marginTop: 4 },
  section: { marginTop: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold' },
  listContent: { paddingLeft: 16 },
});