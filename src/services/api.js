import { 
  TMDB_API_KEY, 
  TMDB_BASE_URL, 
  AUTH_API_URL, 
  API_ENDPOINTS 
} from '../utils/constants';

// Generic API request function
const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// TMDB API
export const tmdbAPI = {
  // Get trending movies
  getTrendingMovies: async (page = 1) => {
    const url = `${TMDB_BASE_URL}${API_ENDPOINTS.TRENDING_MOVIES}?api_key=${TMDB_API_KEY}&page=${page}`;
    return apiRequest(url);
  },

  // Get popular movies
  getPopularMovies: async (page = 1) => {
    const url = `${TMDB_BASE_URL}${API_ENDPOINTS.POPULAR_MOVIES}?api_key=${TMDB_API_KEY}&page=${page}`;
    return apiRequest(url);
  },

  // Get top rated movies
  getTopRatedMovies: async (page = 1) => {
    const url = `${TMDB_BASE_URL}${API_ENDPOINTS.TOP_RATED_MOVIES}?api_key=${TMDB_API_KEY}&page=${page}`;
    return apiRequest(url);
  },

  // Get now playing movies
  getNowPlayingMovies: async (page = 1) => {
    const url = `${TMDB_BASE_URL}${API_ENDPOINTS.NOW_PLAYING}?api_key=${TMDB_API_KEY}&page=${page}`;
    return apiRequest(url);
  },

  // Get upcoming movies
  getUpcomingMovies: async (page = 1) => {
    const url = `${TMDB_BASE_URL}${API_ENDPOINTS.UPCOMING}?api_key=${TMDB_API_KEY}&page=${page}`;
    return apiRequest(url);
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    const url = `${TMDB_BASE_URL}${API_ENDPOINTS.MOVIE_DETAILS}/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,similar`;
    return apiRequest(url);
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    const url = `${TMDB_BASE_URL}${API_ENDPOINTS.SEARCH_MOVIE}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
    return apiRequest(url);
  },

  // Get movies by category
  getMoviesByCategory: async (category, page = 1) => {
    const categoryEndpoints = {
      trending: API_ENDPOINTS.TRENDING_MOVIES,
      popular: API_ENDPOINTS.POPULAR_MOVIES,
      top_rated: API_ENDPOINTS.TOP_RATED_MOVIES,
      now_playing: API_ENDPOINTS.NOW_PLAYING,
      upcoming: API_ENDPOINTS.UPCOMING,
    };

    const endpoint = categoryEndpoints[category] || API_ENDPOINTS.POPULAR_MOVIES;
    const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&page=${page}`;
    return apiRequest(url);
  },
};

// Authentication API (Using DummyJSON)
export const authAPI = {
  // Login
  login: async (username, password) => {
    try {
      // First, check if this is a locally registered user
      const { storage } = require('./storage');
      const { STORAGE_KEYS } = require('../utils/constants');
      const registeredUsers = await storage.get(STORAGE_KEYS.REGISTERED_USERS) || [];
      
      const localUser = registeredUsers.find(u => u.username === username);
      
      if (localUser) {
        // Verify password for local user
        if (localUser.password === password) {
          // Generate a new mock token
          const mockToken = `local_token_${Date.now()}`;
          return {
            token: mockToken,
            user: {
              id: localUser.id,
              username: localUser.username,
              email: localUser.email,
              firstName: localUser.firstName,
              lastName: localUser.lastName,
              image: localUser.image,
            },
          };
        } else {
          throw new Error('Invalid username or password');
        }
      }
      
      // If not a local user, try DummyJSON API
      const url = `${AUTH_API_URL}${API_ENDPOINTS.AUTH_LOGIN}`;
      const response = await apiRequest(url, {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60, // optional
        }),
      });

      return {
        token: response.token,
        user: {
          id: response.id,
          username: response.username,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          image: response.image,
        },
      };
    } catch (error) {
      throw new Error('Invalid username or password');
    }
  },

  // Register (Using DummyJSON add user endpoint)
  register: async ({ username, email, password, firstName, lastName }) => {
    try {
      // Store user locally since DummyJSON doesn't persist new users
      const { storage } = require('./storage');
      const { STORAGE_KEYS } = require('../utils/constants');
      
      // Get existing registered users
      const registeredUsers = await storage.get(STORAGE_KEYS.REGISTERED_USERS) || [];
      
      // Check if username already exists
      if (registeredUsers.find(u => u.username === username)) {
        throw new Error('Username already exists');
      }
      
      // Check if email already exists
      if (registeredUsers.find(u => u.email === email)) {
        throw new Error('Email already exists');
      }
      
      // Create new user
      const newUser = {
        id: Date.now(), // Generate unique ID
        username,
        email,
        password, // In production, this should be hashed!
        firstName,
        lastName,
        image: `https://via.placeholder.com/150/1e293b/ffffff?text=${firstName.charAt(0)}`,
        createdAt: new Date().toISOString(),
      };
      
      // Add to registered users
      registeredUsers.push(newUser);
      await storage.save(STORAGE_KEYS.REGISTERED_USERS, registeredUsers);
      
      // Generate token
      const mockToken = `local_token_${Date.now()}`;

      return {
        token: mockToken,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          image: newUser.image,
        },
      };
    } catch (error) {
      throw new Error(error.message || 'Registration failed. Please try again.');
    }
  },

  // Get current user profile
  getProfile: async (token) => {
    try {
      const url = `${AUTH_API_URL}${API_ENDPOINTS.AUTH_PROFILE}`;
      const response = await apiRequest(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return {
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        image: response.image,
      };
    } catch (error) {
      throw new Error('Failed to fetch user profile');
    }
  },
};

// Helper function to construct image URL
export const getImageUrl = (path, size = 'POSTER_MEDIUM') => {
  if (!path) return null;
  const { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } = require('../utils/constants');
  return `${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES[size]}${path}`;
};
