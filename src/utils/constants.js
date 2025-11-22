// TMDB API Configuration
export const TMDB_API_KEY = 'f3bac14d1df31224ccc81900c17cc8da';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Image sizes
export const IMAGE_SIZES = {
  POSTER_SMALL: '/w185',
  POSTER_MEDIUM: '/w342',
  POSTER_LARGE: '/w500',
  BACKDROP_SMALL: '/w300',
  BACKDROP_MEDIUM: '/w780',
  BACKDROP_LARGE: '/w1280',
  ORIGINAL: '/original',
  PROFILE: '/w185',
};

// API Endpoints
export const API_ENDPOINTS = {
  // Movies
  TRENDING_MOVIES: '/trending/movie/week',
  POPULAR_MOVIES: '/movie/popular',
  TOP_RATED_MOVIES: '/movie/top_rated',
  NOW_PLAYING: '/movie/now_playing',
  UPCOMING: '/movie/upcoming',
  MOVIE_DETAILS: '/movie',
  SEARCH_MOVIE: '/search/movie',
  
  // Auth (DummyJSON)
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/users/add',
  AUTH_PROFILE: '/auth/me',
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  FAVORITES: 'favorites',
  THEME: 'theme_preference',
};

// Dummy API for Authentication
export const AUTH_API_URL = 'https://dummyjson.com';

// App Constants
export const APP_NAME = 'StreamBox';
export const DEFAULT_AVATAR = 'https://via.placeholder.com/150/1e293b/ffffff?text=User';

// Validation Rules
export const VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 50,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
};

// App Colors
export const COLORS = {
  LIGHT: {
    primary: '#e50914',
    secondary: '#221f1f',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#000000',
    textSecondary: '#666666',
    border: '#e0e0e0',
    card: '#ffffff',
    error: '#d32f2f',
    success: '#388e3c',
    rating: '#ffd700',
  },
  DARK: {
    primary: '#e50914',
    secondary: '#b20710',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#ffffff',
    textSecondary: '#94a3b8',
    border: '#334155',
    card: '#1e293b',
    error: '#ef4444',
    success: '#22c55e',
    rating: '#ffd700',
  },
};

// Movie Categories
export const MOVIE_CATEGORIES = [
  { id: 'trending', label: 'Trending', icon: 'trending-up' },
  { id: 'popular', label: 'Popular', icon: 'star' },
  { id: 'top_rated', label: 'Top Rated', icon: 'award' },
  { id: 'now_playing', label: 'Now Playing', icon: 'play-circle' },
  { id: 'upcoming', label: 'Upcoming', icon: 'clock' },
];