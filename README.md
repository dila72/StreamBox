# StreamBox - Movie Discovery App

A modern React Native mobile application for discovering and managing your favorite movies. Built with production-ready architecture, Redux Toolkit state management, and TMDB API integration.

## 🎯 Features

- **Authentication**: Secure login/registration with encrypted password storage
- **Movie Discovery**: Browse trending, popular, and upcoming movies
- **Search**: Real-time movie search with debounced input
- **Favorites**: Save and manage favorite movies with local persistence
- **Movie Details**: Comprehensive information with ratings, cast, and trailers
- **Dark Mode**: Light/dark theme with persistent preference
- **Profile Management**: View profile and manage app settings

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation 7.x
- **Storage**: Expo SecureStore & AsyncStorage
- **Form Validation**: Yup
- **Password Security**: bcryptjs
- **Testing**: Jest & React Native Testing Library
- **API**: TMDB (Movies), DummyJSON (Auth Demo)

## 📋 Prerequisites

- Node.js (v14+)
- Expo CLI
- iOS Simulator or Android Emulator
- TMDB API Key ([Get free key](https://www.themoviedb.org/settings/api))

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

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
TMDB_API_KEY=your_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
AUTH_API_URL=https://dummyjson.com
```

4. **Start the app**
```bash
npm start
```

5. **Run on device**
- iOS: Press `i` or scan QR with Expo Go
- Android: Press `a` or scan QR with Expo Go

## 📁 Project Structure

```
StreamBox/
├── src/
│   ├── components/         # Reusable UI components
│   ├── features/          # Feature modules (auth, movies, favorites)
│   ├── hooks/             # Custom React hooks
│   ├── navigation/        # Navigation setup
│   ├── screens/           # Screen components
│   ├── services/          # API & storage services
│   ├── store/             # Redux slices
│   ├── config/            # App configuration
│   ├── utils/             # Utilities & helpers
│   └── theme/             # Theme configuration
├── .env                   # Environment variables (create this)
├── babel.config.js
└── package.json
```

## 🔐 Authentication

**Demo Credentials:**
- Username: `emilys`
- Password: `emilyspass`

Or create a new account (passwords are encrypted with bcrypt).

## 🔧 Available Scripts

```bash
npm start          # Start development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm test           # Run tests
npm run lint       # Lint code
```

## 🎯 Key Features

### Security
- ✅ Environment-based API key management
- ✅ bcrypt password encryption (10 rounds)
- ✅ Secure token storage with Expo SecureStore
- ✅ Production-safe logging system

### Performance
- ✅ React.memo for component optimization
- ✅ useCallback & useMemo hooks
- ✅ Skeleton loading animations
- ✅ Debounced search input
- ✅ API request timeout (15s)

### Code Quality
- ✅ Feature-based architecture
- ✅ Custom hooks pattern
- ✅ Redux Toolkit state management
- ✅ Comprehensive test coverage
- ✅ Error boundaries
- ✅ TypeScript type definitions

## 📄 License

Educational project.

---

**Built with ❤️ using React Native & Expo**
