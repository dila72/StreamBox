import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../services/api';
import { secureStorage, storage } from '../services/storage';
import { STORAGE_KEYS } from '../utils/constants';

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(username, password);
      
      // Ensure token is a string before saving to SecureStore
      const tokenString = String(response.token || '');
      
      // Save token securely (only if valid)
      if (tokenString) {
        await secureStorage.save(STORAGE_KEYS.AUTH_TOKEN, tokenString);
      }
      
      // Save user data
      await storage.save(STORAGE_KEYS.USER_DATA, response.user);
      
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      
      // Ensure token is a string before saving to SecureStore
      const tokenString = String(response.token || '');
      
      // Save token securely (only if valid)
      if (tokenString) {
        await secureStorage.save(STORAGE_KEYS.AUTH_TOKEN, tokenString);
      }
      
      // Save user data
      await storage.save(STORAGE_KEYS.USER_DATA, response.user);
      
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadStoredAuth = createAsyncThunk(
  'auth/loadStored',
  async (_, { rejectWithValue }) => {
    try {
      const token = await secureStorage.get(STORAGE_KEYS.AUTH_TOKEN);
      const user = await storage.get(STORAGE_KEYS.USER_DATA);
      
      if (token && user) {
        return { token, user };
      }
      
      throw new Error('No stored authentication');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await secureStorage.remove(STORAGE_KEYS.AUTH_TOKEN);
      await storage.remove(STORAGE_KEYS.USER_DATA);
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isInitialized: false,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Load stored auth
      .addCase(loadStoredAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadStoredAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isInitialized = true;
      })
      .addCase(loadStoredAuth.rejected, (state) => {
        state.isLoading = false;
        state.isInitialized = true;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;