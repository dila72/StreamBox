/**
 * useAuth Hook
 * Custom hook for authentication operations with enhanced error handling
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, logout, clearError } from '../../../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const login = useCallback(async (credentials) => {
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  }, [dispatch]);

  const register = useCallback(async (userData) => {
    try {
      const result = await dispatch(registerUser(userData)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message || 'Registration failed' };
    }
  }, [dispatch]);

  const signOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    login,
    register,
    logout: signOut,
    clearError: clearAuthError,
  };
};
