# StreamBox - Git Commit Guide

This document provides suggested commit messages for feature-based commits as required by the project guidelines.

## 📝 Suggested Commit Sequence

### Phase 1: Project Setup
```bash
git add package.json app.json
git commit -m "feat: initialize React Native project with Expo and install core dependencies"

git add src/utils/constants.js
git commit -m "feat: add project constants and API configuration"

git add src/theme/
git commit -m "feat: implement theme system with light and dark mode support"
```

### Phase 2: Storage & Services
```bash
git add src/services/storage.js
git commit -m "feat: implement secure storage service for auth tokens and data persistence"

git add src/services/api.js
git commit -m "feat: integrate TMDB API and DummyJSON authentication services"

git add src/utils/validation.js
git commit -m "feat: add form validation utilities with Yup schemas"
```

### Phase 3: Redux State Management
```bash
git add src/store/index.js
git commit -m "feat: configure Redux store with middleware"

git add src/store/authSlice.js
git commit -m "feat: implement authentication state management with Redux Toolkit"

git add src/store/moviesSlice.js
git commit -m "feat: add movies state management with async thunks for API calls"

git add src/store/favoritesSlice.js
git commit -m "feat: implement favorites management with local persistence"

git add src/store/themeSlice.js
git commit -m "feat: add theme state management with persistent storage"

git add src/hooks/useTheme.js
git commit -m "feat: create custom theme hook for component styling"
```

### Phase 4: Reusable Components
```bash
git add src/components/LoadingSpinner.js
git commit -m "feat: add loading spinner component with theme support"

git add src/components/SearchBar.js
git commit -m "feat: create search bar component with clear functionality"

git add src/components/MovieCard.js
git commit -m "feat: implement movie card component with favorites toggle"
```

### Phase 5: Authentication Screens
```bash
git add src/screens/Auth/LoginScreen.js
git commit -m "feat: implement login screen with form validation and error handling"

git add src/screens/Auth/RegisterScreen.js
git commit -m "feat: add user registration screen with comprehensive validation"

git add src/navigation/AuthNavigator.js
git commit -m "feat: create authentication navigation stack"
```

### Phase 6: Main App Screens
```bash
git add src/screens/Home/HomeScreen.js
git commit -m "feat: implement home screen with trending and popular movie lists"

git add src/screens/Home/DetailsScreen.js
git commit -m "feat: create movie details screen with cast, trailer, and favorite toggle"

git add src/screens/Home/SearchScreen.js
git commit -m "feat: add search functionality with grid layout results"

git add src/screens/Favorites/FavoritesScreen.js
git commit -m "feat: implement favorites screen with persistent storage"

git add src/screens/Profile/ProfileScreen.js
git commit -m "feat: create profile screen with dark mode toggle and logout"
```

### Phase 7: Navigation
```bash
git add src/navigation/MainNavigator.js
git commit -m "feat: implement bottom tab navigation with nested stacks"

git add src/navigation/AppNavigator.js
git commit -m "feat: create root navigator with authentication flow"
```

### Phase 8: App Entry Point
```bash
git add App.js
git commit -m "feat: configure app entry point with Redux Provider and navigation"
```

### Phase 9: Documentation
```bash
git add README.md
git commit -m "docs: add comprehensive README with setup instructions"

git add QUICKSTART.md
git commit -m "docs: create quick start guide for developers"

git add FEATURES.md
git commit -m "docs: add feature checklist and requirements compliance"

git add .gitignore
git commit -m "chore: add gitignore for node_modules and build artifacts"
```

## 🎯 Alternative Commit Strategy (Consolidated)

If you prefer fewer, more consolidated commits:

```bash
# Initial Setup
git add package.json app.json src/utils/ src/theme/
git commit -m "feat: initialize project with dependencies, constants, and theme system"

# Backend Services
git add src/services/ src/utils/validation.js
git commit -m "feat: implement API integration and storage services with validation"

# State Management
git add src/store/ src/hooks/
git commit -m "feat: set up Redux store with auth, movies, favorites, and theme slices"

# UI Components
git add src/components/
git commit -m "feat: create reusable components (MovieCard, SearchBar, LoadingSpinner)"

# Authentication
git add src/screens/Auth/ src/navigation/AuthNavigator.js
git commit -m "feat: implement complete authentication flow with login and registration"

# Core Features
git add src/screens/Home/ src/screens/Favorites/ src/screens/Profile/
git commit -m "feat: implement main app screens (Home, Details, Search, Favorites, Profile)"

# Navigation & Integration
git add src/navigation/MainNavigator.js src/navigation/AppNavigator.js App.js
git commit -m "feat: integrate navigation system and configure app entry point"

# Documentation
git add *.md
git commit -m "docs: add comprehensive project documentation"
```

## 📋 Commit Message Conventions

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(auth): add password visibility toggle to login form
fix(movies): resolve issue with undefined movie ratings
docs(readme): update installation instructions
style(components): improve MovieCard spacing and shadows
refactor(api): extract common API logic into utility functions
chore(deps): update dependencies to latest versions
```

## 🔍 Best Practices

1. **Atomic Commits**: Each commit should represent a single logical change
2. **Clear Messages**: Write descriptive commit messages explaining what and why
3. **Test Before Commit**: Ensure code works before committing
4. **Reference Issues**: Include issue numbers if applicable (#123)
5. **Present Tense**: Use present tense ("add feature" not "added feature")
6. **Keep Subject Short**: 50 characters or less
7. **Explain in Body**: Use body for detailed explanations if needed

## 🚀 Quick Commit Workflow

```bash
# Check status
git status

# Stage specific files
git add <file-path>

# Or stage all changes
git add .

# Commit with message
git commit -m "feat: your feature description"

# Push to remote
git push origin master
```

## 📝 Notes

- All suggested commits follow conventional commit standards
- Feature-based commits make it easy to track development progress
- Each commit focuses on a specific functionality or component
- Commits are organized in logical development phases
- Documentation commits are separated from feature commits

---

**Remember**: Good commit messages help team members (and future you) understand the project history!
