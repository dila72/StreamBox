import React, { memo, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

const SearchBar = memo(({ value, onChangeText, onSearch, placeholder, autoFocus = false }) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const handleClear = useCallback(() => {
    onChangeText('');
  }, [onChangeText]);

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Feather name="search" size={20} color={colors.textSecondary} />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={placeholder || 'Search movies...'}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
        returnKeyType="search"
        autoFocus={autoFocus}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {value.length > 0 && (
        <TouchableOpacity 
          onPress={handleClear}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="x" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
});

SearchBar.displayName = 'SearchBar';

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginHorizontal: 16, marginVertical: 16 },
  input: { flex: 1, marginLeft: 12, fontSize: 16 },
});

export default SearchBar;
