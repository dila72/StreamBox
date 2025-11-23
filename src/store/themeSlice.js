import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { storage } from '../services/storage';
import { STORAGE_KEYS } from '../utils/constants';

// Async thunks
export const loadTheme = createAsyncThunk(
  'theme/load',
  async (_, { rejectWithValue }) => {
    try {
      const theme = await storage.get(STORAGE_KEYS.THEME);
      return theme || 'light';
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleTheme = createAsyncThunk(
  'theme/toggle',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { theme } = getState().theme;
      const newTheme = theme === 'light' ? 'dark' : 'light';
      await storage.save(STORAGE_KEYS.THEME, newTheme);
      return newTheme;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  theme: 'light', // 'light' or 'dark'
  isLoading: false,
  error: null,
};

// Slice
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      storage.save(STORAGE_KEYS.THEME, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Load theme
      .addCase(loadTheme.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadTheme.fulfilled, (state, action) => {
        state.isLoading = false;
        state.theme = action.payload;
      })
      .addCase(loadTheme.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Toggle theme
      .addCase(toggleTheme.fulfilled, (state, action) => {
        state.theme = action.payload;
      });
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
