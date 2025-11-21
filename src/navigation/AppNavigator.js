import React from 'react';
import { useSelector } from 'react-redux';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

export default function AppNavigator() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
}


