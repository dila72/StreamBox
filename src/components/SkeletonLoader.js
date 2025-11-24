/**
 * Skeleton Loader Component
 * Provides loading placeholder animations
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export const SkeletonBox = ({ width = '100%', height = 20, borderRadius = 4, style }) => {
  const { theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: theme.colors.border,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const MovieCardSkeleton = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
      <SkeletonBox width="100%" height={240} borderRadius={12} />
      <View style={styles.info}>
        <SkeletonBox width="80%" height={16} style={{ marginBottom: 8 }} />
        <SkeletonBox width="40%" height={14} />
      </View>
    </View>
  );
};

export const MovieListSkeleton = ({ count = 4 }) => {
  return (
    <View style={styles.listContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </View>
  );
};

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
    shadowRadius: 3.84,
  },
  info: {
    padding: 12,
  },
  listContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
});
