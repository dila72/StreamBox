/**
 * Environment Configuration
 * Central place for all environment variables and API configurations
 */

// API Configuration
export const API_CONFIG = {
  TMDB: {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: 'f1143c7f2b0e03bebc5224c2d7943248',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
    IMAGE_SIZES: {
      POSTER: {
        SMALL: 'w185',
        MEDIUM: 'w342',
        LARGE: 'w500',
        ORIGINAL: 'original',
      },
      BACKDROP: {
        SMALL: 'w300',
        MEDIUM: 'w780',
        LARGE: 'w1280',
        ORIGINAL: 'original',
      },
    },
  },
  DUMMYJSON: {
    BASE_URL: 'https://dummyjson.com',
  },
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'StreamBox',
  VERSION: '1.0.0',
  BUNDLE_ID: 'com.streambox.app',
  SCHEME: 'streambox',
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME_MODE: 'theme_mode',
  FAVORITES: 'favorites',
  RECENT_SEARCHES: 'recent_searches',
};

// Feature Flags
export const FEATURES = {
  ENABLE_ANALYTICS: false,
  ENABLE_BIOMETRIC_AUTH: false,
  ENABLE_OFFLINE_MODE: false,
  ENABLE_NOTIFICATIONS: false,
};

// Pagination & Limits
export const PAGINATION = {
  MOVIES_PER_PAGE: 20,
  SEARCH_RESULTS_LIMIT: 50,
  RECENT_SEARCHES_LIMIT: 10,
  FAVORITES_CACHE_TTL: 3600000, // 1 hour
};

// Timeouts & Delays
export const TIMEOUTS = {
  API_TIMEOUT: 15000, // 15 seconds
  SEARCH_DEBOUNCE: 500, // 500ms
  SPLASH_SCREEN: 2000, // 2 seconds
};

export default {
  API_CONFIG,
  APP_CONFIG,
  STORAGE_KEYS,
  FEATURES,
  PAGINATION,
  TIMEOUTS,
};
