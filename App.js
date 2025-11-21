import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { loadStoredAuth } from './src/store/authSlice';
import { loadFavorites } from './src/store/favoritesSlice';
import { loadTheme } from './src/store/themeSlice';

function AppContent() {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.theme);
  const { isInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadTheme());
    dispatch(loadStoredAuth());
    dispatch(loadFavorites());
  }, []);

  if (!isInitialized) return null;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}