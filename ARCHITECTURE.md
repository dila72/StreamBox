# Modern React Native Architecture - StreamBox

## 🏗️ Architecture Overview

StreamBox follows modern React Native best practices with a feature-based architecture, emphasizing:

- **Separation of Concerns**: Clear boundaries between features, components, and utilities
- **Performance Optimization**: Memoization, lazy loading, and optimized rendering
- **Type Safety**: TypeScript type definitions for better code quality
- **Testability**: Comprehensive testing setup with Jest and React Testing Library
- **Maintainability**: Modular structure that scales with your application

---

## 📁 Project Structure

```
StreamBox/
├── src/
│   ├── features/                 # Feature-based modules
│   │   ├── auth/
│   │   │   ├── components/       # Auth-specific components
│   │   │   ├── hooks/            # useAuth hook
│   │   │   └── screens/          # Login, Register screens
│   │   ├── movies/
│   │   │   ├── components/       # Movie-specific components
│   │   │   ├── hooks/            # useMovies hook
│   │   │   └── screens/          # Home, Details, Search screens
│   │   ├── favorites/
│   │   │   ├── components/       # Favorites-specific components
│   │   │   ├── hooks/            # useFavorites hook
│   │   │   └── screens/          # FavoritesScreen
│   │   └── profile/
│   │       ├── components/       # Profile-specific components
│   │       └── screens/          # ProfileScreen
│   │
│   ├── components/               # Shared/reusable components
│   │   ├── MovieCard.js          # Optimized with React.memo
│   │   ├── SearchBar.js          # Optimized with React.memo
│   │   ├── LoadingSpinner.js
│   │   └── __tests__/            # Component tests
│   │
│   ├── navigation/               # Navigation configuration
│   │   ├── AppNavigator.js       # Root navigator
│   │   ├── AuthNavigator.js      # Auth stack
│   │   └── MainNavigator.js      # Main app stack
│   │
│   ├── store/                    # Redux Toolkit state management
│   │   ├── index.js              # Store configuration
│   │   ├── authSlice.js          # Authentication state
│   │   ├── moviesSlice.js        # Movies state
│   │   ├── favoritesSlice.js     # Favorites state
│   │   └── themeSlice.js         # Theme state
│   │
│   ├── services/                 # External services
│   │   ├── api.js                # API client (TMDB, DummyJSON)
│   │   └── storage.js            # AsyncStorage/SecureStore wrapper
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useTheme.js           # Theme hook
│   │   ├── useDebounce.js        # Debounce hook for search
│   │   ├── useMount.js           # Mount lifecycle hook
│   │   └── useColorScheme.ts     # Color scheme detection
│   │
│   ├── lib/                      # Shared libraries
│   │   └── errorBoundary.js      # Error boundary component
│   │
│   ├── config/                   # Configuration files
│   │   └── env.js                # Environment variables & constants
│   │
│   ├── types/                    # TypeScript definitions
│   │   └── index.ts              # All type definitions
│   │
│   ├── theme/                    # Theme configuration
│   │   └── index.js              # Light/dark theme definitions
│   │
│   └── utils/                    # Utility functions
│       ├── constants.js          # App constants
│       ├── validation.js         # Form validation schemas
│       └── testUtils.js          # Testing utilities
│
├── App.js                        # App entry point with Error Boundary
├── package.json                  # Dependencies and scripts
├── jest.config.js                # Jest testing configuration
└── tsconfig.json                 # TypeScript configuration
```

---

## 🎯 Key Architectural Decisions

### 1. **Feature-Based Organization**

Instead of grouping by file type (components, screens, etc.), we organize by feature:

```
features/
  auth/
    hooks/useAuth.js
    screens/LoginScreen.js
  movies/
    hooks/useMovies.js
    screens/HomeScreen.js
```

**Benefits:**
- Related code stays together
- Easier to find and modify features
- Better for team collaboration
- Scales well as app grows

### 2. **Custom Hooks Pattern**

Each feature exposes a custom hook that encapsulates business logic:

```javascript
// features/auth/hooks/useAuth.js
export const useAuth = () => {
  const { user, login, logout, ... } = useAuthLogic();
  return { user, login, logout };
};
```

**Benefits:**
- Reusable logic across components
- Cleaner component code
- Easier to test
- Better separation of concerns

### 3. **Performance Optimizations**

#### React.memo for Components
```javascript
const MovieCard = memo(({ movie, onPress }) => {
  // Component only re-renders if props change
});
```

#### useCallback for Event Handlers
```javascript
const handlePress = useCallback(() => {
  onPress?.(movie);
}, [movie, onPress]);
```

#### useMemo for Computed Values
```javascript
const hasFavorites = useMemo(
  () => favorites.length > 0,
  [favorites]
);
```

#### FlatList Optimizations
```javascript
<FlatList
  removeClippedSubviews={true}
  maxToRenderPerBatch={5}
  initialNumToRender={3}
  windowSize={5}
/>
```

### 4. **Centralized Configuration**

All configuration in one place (`src/config/env.js`):

```javascript
export const API_CONFIG = {
  TMDB: {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: 'your-api-key',
  },
};
```

**Benefits:**
- Easy to manage environment variables
- Single source of truth
- Safer secret management
- Environment-specific configs

### 5. **Error Handling Strategy**

#### Error Boundary
Catches JavaScript errors in component tree:
```javascript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

#### Async Error Handling
All async operations return success/error:
```javascript
const { success, error } = await login(credentials);
if (!success) {
  Alert.alert('Error', error);
}
```

### 6. **Type Safety**

TypeScript definitions for all data structures:

```typescript
// src/types/index.ts
export interface Movie {
  id: number;
  title: string;
  overview: string;
  // ...
}
```

**Benefits:**
- Better IDE autocomplete
- Catch errors at compile time
- Self-documenting code
- Easier refactoring

---

## 🧪 Testing Strategy

### Test Structure
```
src/
  components/
    __tests__/
      MovieCard.test.js
  features/
    auth/
      __tests__/
        useAuth.test.js
```

### Testing Utilities
- `renderWithProviders()` - Render with Redux
- `renderWithNavigationAndProviders()` - Render with Redux + Navigation
- Mock data helpers for consistent testing

### Running Tests
```bash
npm test                 # Run all tests
npm test -- --watch      # Watch mode
npm test -- --coverage   # Coverage report
```

---

## 🚀 Performance Best Practices

### 1. **Avoid Unnecessary Re-renders**
- Use `React.memo` for pure components
- Use `useCallback` for event handlers
- Use `useMemo` for expensive computations

### 2. **Optimize Lists**
- Use `FlatList` instead of `ScrollView` with `.map()`
- Implement `keyExtractor` properly
- Use `removeClippedSubviews`
- Set appropriate `windowSize` and `maxToRenderPerBatch`

### 3. **Image Optimization**
- Use appropriate image sizes from TMDB API
- Implement placeholder images
- Consider using `expo-image` for better performance

### 4. **Debounce Expensive Operations**
```javascript
const debouncedSearch = useDebounce(searchQuery, 500);
```

### 5. **Code Splitting**
- Lazy load screens
- Dynamic imports for large components
- Split bundle by route

---

## 🔐 Security Best Practices

1. **Secure Storage**: Use `expo-secure-store` for sensitive data (tokens)
2. **Environment Variables**: Never commit API keys to Git
3. **Input Validation**: Always validate user input with Yup schemas
4. **API Security**: Implement rate limiting and error handling

---

## 📊 State Management Strategy

### Redux Toolkit Slices
Each feature has its own slice:

```javascript
// authSlice.js
export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: { ... },
  extraReducers: { ... }
});
```

### Async Operations
Use `createAsyncThunk` for API calls:

```javascript
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await api.login(credentials);
    return response.data;
  }
);
```

---

## 🎨 Theming Strategy

### Dynamic Theming
- Light/dark mode support
- Theme persisted to storage
- Theme hook for easy access

```javascript
const { theme, isDark, toggleTheme } = useTheme();
```

---

## 📦 Dependency Management

### Core Dependencies
- **React Native**: Mobile framework
- **Expo**: Development and build platform
- **Redux Toolkit**: State management
- **React Navigation**: Navigation
- **Yup**: Validation

### Dev Dependencies
- **Jest**: Testing framework
- **ESLint**: Code linting
- **TypeScript**: Type checking

---

## 🔄 CI/CD Considerations

### Pre-commit Hooks (Recommended)
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm test"
    }
  }
}
```

### Build Scripts
```json
{
  "scripts": {
    "build:android": "expo build:android",
    "build:ios": "expo build:ios",
    "test:ci": "jest --ci --coverage"
  }
}
```

---

## 🎯 Future Enhancements

### Recommended Additions
1. **React Query**: Better data fetching and caching
2. **React Native Reanimated**: Advanced animations
3. **Sentry**: Error tracking in production
4. **Analytics**: Firebase Analytics or Amplitude
5. **Push Notifications**: Expo Notifications
6. **Biometric Auth**: Face ID / Touch ID
7. **Offline Support**: Redux Persist + Cache
8. **Internationalization**: i18next for multi-language

---

## 📚 Resources

- [React Native Best Practices](https://reactnative.dev/docs/performance)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Navigation Guide](https://reactnavigation.org/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [Testing Library](https://testing-library.com/docs/react-native-testing-library/intro)

---

## 🤝 Contributing

When adding new features:

1. **Create feature folder** in `src/features/`
2. **Add custom hook** for business logic
3. **Write tests** for components and hooks
4. **Update types** in `src/types/index.ts`
5. **Document changes** in this architecture guide

---

## 📝 Summary

StreamBox implements modern React Native architecture with:

✅ Feature-based organization  
✅ Custom hooks for reusable logic  
✅ Performance optimizations (memo, useCallback, useMemo)  
✅ Error boundaries and comprehensive error handling  
✅ Centralized configuration  
✅ Type safety with TypeScript definitions  
✅ Testing infrastructure  
✅ Clean separation of concerns  
✅ Scalable and maintainable structure  

This architecture is production-ready and follows industry best practices for React Native development in 2025.
