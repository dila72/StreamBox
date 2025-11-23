/**
 * Type Definitions for StreamBox App
 * Central location for all TypeScript interfaces and types
 */

// ============================================
// User & Authentication Types
// ============================================

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  gender?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

// ============================================
// Movie Types
// ============================================

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  adult?: boolean;
  original_language?: string;
  original_title?: string;
  video?: boolean;
}

export interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: Country[];
  spoken_languages: Language[];
  homepage?: string;
  imdb_id?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Country {
  iso_3166_1: string;
  name: string;
}

export interface Language {
  iso_639_1: string;
  name: string;
  english_name: string;
}

export interface MoviesState {
  trending: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
  searchResults: Movie[];
  currentMovie: MovieDetails | null;
  isLoading: boolean;
  isSearching: boolean;
  error: string | null;
  searchQuery: string;
}

// ============================================
// Favorites Types
// ============================================

export interface FavoritesState {
  items: Movie[];
  isLoading: boolean;
  error: string | null;
}

// ============================================
// Theme Types
// ============================================

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
}

export interface ThemeState {
  isDark: boolean;
  theme: Theme;
}

// ============================================
// Navigation Types
// ============================================

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  HomeStack: undefined;
  Favorites: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Details: { movieId: number };
  Search: undefined;
};

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBMoviesResponse extends PaginatedResponse<Movie> {}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

// ============================================
// Component Props Types
// ============================================

export interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
  style?: any;
}

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
}

// ============================================
// Utility Types
// ============================================

export type AsyncThunkStatus = 'idle' | 'pending' | 'succeeded' | 'failed';

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string | null | undefined;
}
