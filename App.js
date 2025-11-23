import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { loadStoredAuth } from './src/store/authSlice';
import { loadFavorites } from './src/store/favoritesSlice';
import { loadTheme } from './src/store/themeSlice';
import { useTheme } from './src/hooks/useTheme';
import ErrorBoundary from './src/lib/errorBoundary';

function AppContent() {
  const dispatch = useDispatch();
  const { theme, isDark } = useTheme();
  const { isInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await Promise.all([
          dispatch(loadTheme()),
          dispatch(loadStoredAuth()),
          dispatch(loadFavorites()),
        ]);
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, [dispatch]);

  if (!isInitialized) return null;

  return (
    <>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.colors.background} 
      />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </ErrorBoundary>
  );
}