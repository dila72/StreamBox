import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { logoutUser } from '../../store/authSlice';
import { clearFavorites } from '../../store/favoritesSlice';
import { toggleTheme } from '../../store/themeSlice';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { colors, mode } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);
  const { favorites } = useSelector((state) => state.favorites);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => dispatch(logoutUser()) },
    ]);
  };

  const handleClearFavorites = () => {
    Alert.alert('Clear Favorites', 'Are you sure you want to remove all favorites?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: () => dispatch(clearFavorites()) },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Image source={{ uri: user?.image || 'https://via.placeholder.com/150/1e293b/ffffff?text=User' }} style={styles.avatar} />
        <Text style={[styles.name, { color: colors.text }]}>{user?.firstName} {user?.lastName}</Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>@{user?.username}</Text>
      </View>

      <View style={styles.content}>
        {/* Stats */}
        <View style={[styles.statsCard, { backgroundColor: colors.card }]}>
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{favorites.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Favorites</Text>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>SETTINGS</Text>
          
          <TouchableOpacity style={[styles.item, { backgroundColor: colors.card }]} onPress={() => dispatch(toggleTheme())}>
            <Feather name={mode === 'dark' ? 'moon' : 'sun'} size={20} color={colors.text} />
            <Text style={[styles.itemText, { color: colors.text }]}>Dark Mode</Text>
            <Feather name={mode === 'dark' ? 'toggle-right' : 'toggle-left'} size={24} color={mode === 'dark' ? colors.primary : colors.textSecondary} />
          </TouchableOpacity>

          {favorites.length > 0 && (
            <TouchableOpacity style={[styles.item, { backgroundColor: colors.card }]} onPress={handleClearFavorites}>
              <Feather name="trash-2" size={20} color={colors.error} />
              <Text style={[styles.itemText, { color: colors.text }]}>Clear Favorites</Text>
              <Feather name="chevron-right" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.item, { backgroundColor: colors.card }]} onPress={handleLogout}>
            <Feather name="log-out" size={20} color={colors.error} />
            <Text style={[styles.itemText, { color: colors.text }]}>Logout</Text>
            <Feather name="chevron-right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 80, paddingBottom: 32, alignItems: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  email: { fontSize: 14 },
  content: { flex: 1, padding: 20 },
  statsCard: { flexDirection: 'row', justifyContent: 'space-around', padding: 20, borderRadius: 12, marginBottom: 24 },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  statLabel: { fontSize: 12 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 12, fontWeight: '600', marginBottom: 12, paddingHorizontal: 4 },
  item: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 8, gap: 12 },
  itemText: { flex: 1, fontSize: 16 },
});