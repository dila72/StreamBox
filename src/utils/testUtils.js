/**
 * Testing Utilities
 * Helper functions for testing React components
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import moviesReducer from '../store/moviesSlice';
import favoritesReducer from '../store/favoritesSlice';
import themeReducer from '../store/themeSlice';

/**
 * Create a test store with optional preloaded state
 */
export const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      movies: moviesReducer,
      favorites: favoritesReducer,
      theme: themeReducer,
    },
    preloadedState,
  });
};

/**
 * Custom render function that includes Redux Provider
 */
export const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

/**
 * Custom render function with both Redux and Navigation
 */
export const renderWithNavigationAndProviders = (
  ui,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <NavigationContainer>{children}</NavigationContainer>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

/**
 * Mock movie data for testing
 */
export const mockMovie = {
  id: 1,
  title: 'Test Movie',
  overview: 'This is a test movie',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100,
};

/**
 * Mock user data for testing
 */
export const mockUser = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  image: 'https://via.placeholder.com/150',
};

/**
 * Mock navigation object
 */
export const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
  reset: jest.fn(),
  dispatch: jest.fn(),
};

/**
 * Mock route object
 */
export const mockRoute = {
  params: {},
  key: 'test-route',
  name: 'TestScreen',
};
