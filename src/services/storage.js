import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import logger from '../utils/logger';

// Secure Storage (for sensitive data like tokens)
export const secureStorage = {
  // Save secure item
  save: async (key, value) => {
    try {
      // Ensure value is a string
      if (typeof value !== 'string') {
        logger.warn(`SecureStore: Converting non-string value to string for key "${key}"`);
        value = String(value);
      }
      
      // Don't save empty strings
      if (!value) {
        logger.warn(`SecureStore: Attempted to save empty value for key "${key}"`);
        return false;
      }
      
      await SecureStore.setItemAsync(key, value);
      return true;
    } catch (error) {
      logger.error('SecureStore save error:', error);
      return false;
    }
  },

  // Get secure item
  get: async (key) => {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value;
    } catch (error) {
      logger.error('SecureStore get error:', error);
      return null;
    }
  },

  // Delete secure item
  remove: async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
      return true;
    } catch (error) {
      logger.error('SecureStore remove error:', error);
      return false;
    }
  },
};

// Regular Storage (for non-sensitive data)
export const storage = {
  // Save item
  save: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      logger.error('AsyncStorage save error:', error);
      return false;
    }
  },

  // Get item
  get: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      logger.error('AsyncStorage get error:', error);
      return null;
    }
  },

  // Remove item
  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      logger.error('AsyncStorage remove error:', error);
      return false;
    }
  },

  // Clear all
  clear: async () => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      logger.error('AsyncStorage clear error:', error);
      return false;
    }
  },
};