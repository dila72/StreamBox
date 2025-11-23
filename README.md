# StreamBox - Entertainment & Media App

A modern React Native mobile application built with production-ready architecture for browsing trending movies and managing your entertainment favorites. Features Redux Toolkit state management, custom hooks, performance optimizations, and integrates with The Movie Database (TMDB) API.

## 🎯 Features

### Core Features
- **User Authentication**: Secure login/registration using DummyJSON API
- **Movie Browsing**: Browse trending, popular, top-rated, and upcoming movies
- **Search Functionality**: Search for movies with debounced real-time results
- **Favorites Management**: Save and manage your favorite movies with local persistence
- **Movie Details**: View comprehensive movie information including ratings and overview
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **User Profile**: View profile information and manage settings

### Technical Features
- **Modern Architecture**: Feature-based organization with custom hooks
- **Performance Optimized**: React.memo, useCallback, useMemo implementations
- **Redux Toolkit**: Centralized state management with async thunks
- **Error Boundaries**: Graceful error handling throughout the app
- **Type Safety**: Complete TypeScript type definitions
- **Testing Ready**: Jest configuration with testing utilities
- **Secure Storage**: Expo SecureStore for tokens, AsyncStorage for data
- **Form Validation**: Yup validation schemas
- **Responsive Navigation**: Bottom tabs with React Navigation
- **Pull-to-refresh**: Refresh data functionality

## 📚 Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Complete architecture guide and best practices
- **[MODERN_ARCHITECTURE.md](MODERN_ARCHITECTURE.md)** - Quick overview of modernization
- **[FEATURES.md](FEATURES.md)** - Detailed feature specifications
- **[TESTING.md](TESTING.md)** - Testing guide and strategies
- **[GIT_COMMITS.md](GIT_COMMITS.md)** - Git commit conventions

## 🏗️ Architecture Highlights

- **Feature-based Structure**: Organized by features (auth, movies, favorites, profile)
- **Custom Hooks**: `useAuth()`, `useMovies()`, `useFavorites()` for reusable logic
- **Performance**: Memoized components and optimized FlatList rendering
- **Error Handling**: Error boundaries with user-friendly error screens
- **Configuration**: Centralized config in `src/config/env.js`
- **Type Definitions**: Complete types in `src/types/index.ts`

## 📱 Screenshots

*(Add your app screenshots here)*

## 🛠️ Tech Stack

- **Framework**: React Native 0.81.5 (Expo SDK 54)
- **State Management**: Redux Toolkit 2.10.1
- **Navigation**: React Navigation 7.x (Stack & Bottom Tabs)
- **Styling**: StyleSheet (React Native)
- **Icons**: Feather Icons (@expo/vector-icons)
- **Storage**: 
  - Expo SecureStore 15.0.7 (tokens)
  - AsyncStorage 2.2.0 (data)
- **Form Validation**: Yup 1.7.1
- **Testing**: Jest with React Native Testing Library
- **APIs**:
  - TMDB API (Movie data)
  - DummyJSON (Authentication)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator
- TMDB API Key (free from https://www.themoviedb.org/settings/api)

## 🚀 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd StreamBox
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API Keys**

The app is already configured with a demo TMDB API key. For production use, get your own API key from TMDB and update it in `src/config/env.js`:

```javascript
export const API_CONFIG = {
  TMDB: {
    API_KEY: 'your_api_key_here',
    // ...
  }
};
```

4. **Start the development server**
```bash
npm start
```

5. **Run on device/simulator**
- For iOS: Press `i` in the terminal or scan QR code with Expo Go
- For Android: Press `a` in the terminal or scan QR code with Expo Go

## 📁 Project Structure

```
StreamBox/
├── App.js                      # Main app entry point with Error Boundary
├── src/
│   ├── features/               # Feature-based modules
│   │   ├── auth/
│   │   │   ├── hooks/          # useAuth hook
│   │   │   └── components/     # Auth-specific components
│   │   ├── movies/
│   │   │   ├── hooks/          # useMovies hook
│   │   │   └── components/     # Movie-specific components
│   │   ├── favorites/
│   │   │   └── hooks/          # useFavorites hook
│   │   └── profile/
│   │       └── components/     # Profile-specific components
│   ├── components/             # Shared reusable components
│   │   ├── MovieCard.js        # Optimized with React.memo
│   │   ├── SearchBar.js        # Optimized with React.memo
│   │   ├── LoadingSpinner.js
│   │   └── __tests__/          # Component tests
│   ├── hooks/                  # Custom React hooks
│   │   ├── useTheme.js
│   │   ├── useDebounce.js
│   │   └── useMount.js
│   ├── navigation/             # Navigation configuration
│   │   ├── AppNavigator.js
│   │   ├── AuthNavigator.js
│   │   └── MainNavigator.js
│   ├── screens/                # Screen components
│   │   ├── Auth/
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── Home/
│   │   │   ├── HomeScreen.js
│   │   │   ├── DetailsScreen.js
│   │   │   └── SearchScreen.js
│   │   ├── Favorites/
│   │   │   └── FavoritesScreen.js
│   │   └── Profile/
│   │       └── ProfileScreen.js
│   ├── services/               # API and storage services
│   │   ├── api.js
│   │   └── storage.js
│   ├── store/                  # Redux Toolkit state management
│   │   ├── index.js
│   │   ├── authSlice.js
│   │   ├── moviesSlice.js
│   │   ├── favoritesSlice.js
│   │   └── themeSlice.js
│   ├── config/                 # Configuration files
│   │   └── env.js              # Environment variables & constants
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts
│   ├── lib/                    # Shared libraries
│   │   └── errorBoundary.js
│   ├── theme/                  # Theme configuration
│   │   └── index.js
│   └── utils/                  # Utility functions
│       ├── constants.js
│       ├── validation.js
│       └── testUtils.js
├── jest.config.js              # Testing configuration
├── package.json
└── README.md
```

**See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed architecture explanation.**

## 🔐 Authentication

The app uses DummyJSON API for demo authentication. Use these credentials:

**Demo Credentials:**
- Username: `emilys`
- Password: `emilyspass`

You can also create a new account (simulated registration).

## 🎨 Features in Detail

### Home Screen
- Displays trending and popular movies from TMDB
- Pull-to-refresh to update movie lists
- Optimized FlatList rendering for smooth scrolling
- Tap on any movie card to view details
- Shows user's first name in header

### Search Screen
- Debounced search for better performance
- Grid layout for search results
- Clear search functionality
- Empty state messages

### Movie Details Screen
- Movie poster and backdrop images
- Rating, release year, and overview
- Movie overview/synopsis
- Cast information with profile pictures
- Genre tags
- Favorite toggle button
- Watch trailer button (opens YouTube)

### Favorites Screen
- Grid view of all favorited movies
- Persistent storage
- Empty state with helpful message
- Quick access to movie details

### Profile Screen
- User information display
- Favorites count
- Dark mode toggle
- Clear favorites option
- Logout functionality

### Dark Mode
- System-wide theme toggle
- Persistent theme preference
- Smooth color transitions
- Optimized for both light and dark viewing

## 🔧 Available Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Reset project (remove example code)
npm run reset-project
```

## 🎯 Best Practices Implemented

1. **Modern Architecture**: Feature-based organization with custom hooks
2. **State Management**: Redux Toolkit with organized slices and async thunks
3. **Performance**: React.memo, useCallback, useMemo optimizations
4. **Type Safety**: Complete TypeScript type definitions
5. **Error Handling**: Error boundaries and structured error responses
6. **Testing**: Jest configuration with testing utilities
7. **Security**: Secure storage for sensitive data (tokens)
8. **Code Quality**: Modular, reusable components with clear separation
9. **Configuration**: Centralized environment configuration
10. **Loading States**: Proper loading indicators for async operations
11. **Data Persistence**: Favorites and theme preferences saved locally
12. **Responsive Design**: Works on various screen sizes
13. **Navigation**: Intuitive navigation structure with stacks and tabs
14. **Debouncing**: Optimized search with debounce hook

## 📝 API Integration

### TMDB API Endpoints Used
- `/trending/movie/week` - Trending movies
- `/movie/popular` - Popular movies
- `/movie/top_rated` - Top rated movies
- `/movie/upcoming` - Upcoming movies
- `/movie/{id}` - Movie details
- `/search/movie` - Movie search

### DummyJSON API
- `/auth/login` - User login
- `/users/add` - User registration

## 🐛 Troubleshooting

**Issue**: App won't start
- Solution: Clear cache with `expo start -c`

**Issue**: Movies not loading
- Solution: Check internet connection and TMDB API key

**Issue**: Login not working
- Solution: Use demo credentials or check DummyJSON API status

## 🚀 Future Enhancements

- [ ] Pagination for movie lists
- [ ] Movie filtering by genre
- [ ] Watch history tracking
- [ ] Social sharing features
- [ ] Offline mode support
- [ ] Push notifications
- [ ] Movie ratings and reviews
- [ ] Watchlist separate from favorites

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

Created as part of a mobile app development project.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie API
- [DummyJSON](https://dummyjson.com/) for authentication API
- [Expo](https://expo.dev/) for the amazing development platform
- [React Navigation](https://reactnavigation.org/) for navigation library
