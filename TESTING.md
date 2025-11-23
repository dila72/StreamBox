# StreamBox - Testing Guide

This guide helps you test all implemented features systematically.

## 🧪 Pre-Testing Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm start`)
- [ ] App loaded on device/simulator
- [ ] Internet connection active

## 📱 Feature Testing Workflow

### 1. Authentication Testing

#### Login Screen
- [ ] App opens to login screen
- [ ] All UI elements visible (logo, input fields, buttons)
- [ ] Username field accepts input
- [ ] Password field accepts input
- [ ] Password visibility toggle works (eye icon)
- [ ] "Fill Demo Credentials" button populates fields
- [ ] Form validation shows errors for empty fields
- [ ] Form validation shows errors for invalid username (<3 chars)
- [ ] Form validation shows errors for invalid password (<6 chars)
- [ ] Successful login with demo credentials (emilys/emilyspass)
- [ ] Login navigates to Home screen on success
- [ ] Error message shown for invalid credentials

#### Registration Screen
- [ ] "Sign Up" link navigates to registration
- [ ] All form fields visible
- [ ] First name field validation works
- [ ] Last name field validation works
- [ ] Email validation checks format
- [ ] Username validation (3-20 chars, alphanumeric)
- [ ] Password validation (6+ chars, uppercase, lowercase, number)
- [ ] Confirm password validates matching passwords
- [ ] Password visibility toggles work for both fields
- [ ] Real-time validation shows errors as you type
- [ ] Registration creates account and logs in
- [ ] "Login" link navigates back to login screen

### 2. Home Screen Testing

#### UI Elements
- [ ] Header shows welcome message with user's first name
- [ ] Film icon displayed in header
- [ ] "Trending Now" section title visible with icon
- [ ] "Popular Movies" section title visible with icon
- [ ] Both sections have horizontal scrollable movie lists

#### Movie Lists
- [ ] Trending movies load and display
- [ ] Popular movies load and display
- [ ] Movie cards show poster images
- [ ] Movie cards show titles
- [ ] Movie cards show ratings with star icon
- [ ] Movie cards show release year with calendar icon
- [ ] Heart icon (favorite button) visible on each card
- [ ] Pull-to-refresh gesture works
- [ ] Smooth horizontal scrolling

#### Interactions
- [ ] Tapping any movie card navigates to Details screen
- [ ] Tapping heart icon adds/removes from favorites
- [ ] Heart icon fills when movie is favorited
- [ ] Heart icon changes color when favorited

### 3. Movie Details Screen Testing

#### Navigation
- [ ] Back button visible and functional
- [ ] Back button returns to previous screen

#### Movie Information
- [ ] Backdrop image displays (if available)
- [ ] Poster image displays
- [ ] Movie title shown
- [ ] Rating displayed with star icon
- [ ] Release year displayed
- [ ] Runtime displayed (if available)
- [ ] Overview/synopsis readable and formatted
- [ ] Genre tags displayed as chips
- [ ] Cast section shows cast members
- [ ] Cast photos load correctly
- [ ] Cast names and character names visible

#### Actions
- [ ] Favorite button works (heart icon)
- [ ] Favorite state persists across navigation
- [ ] Trailer button appears if trailer available
- [ ] Trailer button opens YouTube link
- [ ] All interactive elements respond to touch

### 4. Search Screen Testing

#### Search UI
- [ ] Screen title "Search Movies" visible
- [ ] Search input field with icon displayed
- [ ] Placeholder text shown
- [ ] Initial empty state message ("Search for movies")
- [ ] Film icon displayed in empty state

#### Search Functionality
- [ ] Can type in search field
- [ ] Clear button (X) appears when typing
- [ ] Clear button removes text and results
- [ ] Search executes on keyboard "search" button
- [ ] Search can also be triggered by tapping search icon
- [ ] Loading message appears during search
- [ ] Results display in grid layout (2 columns)
- [ ] "No results found" message for invalid queries
- [ ] Scroll works for multiple results

#### Search Results
- [ ] Movie cards show in grid
- [ ] Each card has all standard elements (image, title, etc.)
- [ ] Tapping result navigates to Details screen
- [ ] Favorite toggle works from search results
- [ ] Results update when new search performed

### 5. Favorites Screen Testing

#### Empty State
- [ ] Empty state shown when no favorites
- [ ] Heart icon displayed
- [ ] "No favorites yet" message shown
- [ ] Helpful subtext displayed

#### With Favorites
- [ ] Screen title "Favorites" with heart icon
- [ ] Favorited movies display in grid (2 columns)
- [ ] All movie card elements visible
- [ ] Scroll works for multiple favorites
- [ ] Tapping movie navigates to Details
- [ ] Heart icon filled/highlighted on cards
- [ ] Unfavoriting removes from list immediately
- [ ] Grid adjusts layout when items removed

### 6. Profile Screen Testing

#### User Information
- [ ] Profile header with gradient/styled background
- [ ] User avatar/image displayed
- [ ] Full name shown (First Last)
- [ ] Username shown with @ prefix
- [ ] Correct user data from login/registration

#### Statistics
- [ ] Stats card displayed
- [ ] Favorites count shown
- [ ] Count updates when favorites change
- [ ] Styled with primary color

#### Settings Section
- [ ] "SETTINGS" label visible
- [ ] Dark mode toggle item visible
- [ ] Current mode icon correct (sun/moon)
- [ ] Toggle switch shows current state
- [ ] Clear Favorites option visible (if has favorites)
- [ ] Logout option visible
- [ ] All items have appropriate icons

#### Interactions
- [ ] Dark mode toggle changes theme immediately
- [ ] Theme persists after app restart
- [ ] Clear favorites shows confirmation dialog
- [ ] Confirming clear removes all favorites
- [ ] Logout shows confirmation dialog
- [ ] Confirming logout returns to login screen
- [ ] User data cleared after logout

### 7. Dark Mode Testing

#### Theme Toggle
- [ ] Toggle in Profile screen works
- [ ] Instant theme switch (no lag)
- [ ] All screens adapt to theme
- [ ] StatusBar color/style adapts

#### Light Theme Colors
- [ ] Background: White
- [ ] Text: Black/Dark Gray
- [ ] Cards: White/Light Gray
- [ ] Borders: Light Gray
- [ ] Icons: Appropriate colors

#### Dark Theme Colors
- [ ] Background: Dark Blue/Black
- [ ] Text: White/Light Gray
- [ ] Cards: Dark Blue/Gray
- [ ] Borders: Darker Gray
- [ ] Icons: Appropriate colors
- [ ] Ratings in gold color
- [ ] Primary red maintained

#### Persistence
- [ ] Close and reopen app
- [ ] Theme preference maintained
- [ ] Loads with last selected theme

### 8. Navigation Testing

#### Bottom Tabs
- [ ] All 4 tabs visible (Home, Search, Favorites, Profile)
- [ ] Icons display correctly
- [ ] Active tab highlighted
- [ ] Labels visible
- [ ] Smooth tab switching
- [ ] Tab bar styled correctly

#### Stack Navigation
- [ ] Push navigation works (to Details)
- [ ] Pop navigation works (back button)
- [ ] Params passed correctly between screens
- [ ] Navigation history maintained
- [ ] Deep linking to Details from different tabs

### 9. Data Persistence Testing

#### Favorites Persistence
- [ ] Add movies to favorites
- [ ] Close app completely
- [ ] Reopen app and login
- [ ] Favorites still present
- [ ] Favorite state shown on cards

#### Theme Persistence
- [ ] Change to dark mode
- [ ] Close app
- [ ] Reopen app
- [ ] Dark mode still active

#### Authentication Persistence
- [ ] Login successfully
- [ ] Close app
- [ ] Reopen app
- [ ] Still logged in (skip login screen)

### 10. Error Handling Testing

#### Network Errors
- [ ] Disable internet
- [ ] Try loading movies
- [ ] Appropriate error handling
- [ ] Enable internet and retry

#### API Errors
- [ ] Invalid search query handling
- [ ] Missing movie data handling
- [ ] Failed image loading (placeholder shown)

#### Form Errors
- [ ] Empty field validation
- [ ] Format validation (email)
- [ ] Length validation (username, password)
- [ ] Match validation (confirm password)
- [ ] Error messages clear and helpful

### 11. Performance Testing

- [ ] Smooth scrolling in lists
- [ ] Fast image loading
- [ ] No lag when switching tabs
- [ ] Quick screen transitions
- [ ] Responsive touch feedback
- [ ] No app crashes
- [ ] Memory usage reasonable

### 12. UI/UX Testing

#### Visual Design
- [ ] Consistent spacing throughout
- [ ] Proper alignment of elements
- [ ] Readable font sizes
- [ ] Good color contrast
- [ ] Professional appearance
- [ ] Icons match design language

#### Responsive Design
- [ ] Works on different screen sizes
- [ ] Layout adapts appropriately
- [ ] Touch targets adequate size
- [ ] No cut-off text or images

#### User Feedback
- [ ] Loading indicators shown during waits
- [ ] Success messages where appropriate
- [ ] Error messages are helpful
- [ ] Empty states are informative
- [ ] Interactive elements have visual feedback

## ✅ Testing Checklist Summary

### Critical Paths
- [ ] Complete user registration flow
- [ ] Complete login flow
- [ ] Browse and view movie details
- [ ] Add and remove favorites
- [ ] Search for movies
- [ ] Toggle dark mode
- [ ] Logout and login again

### Edge Cases
- [ ] Very long movie titles
- [ ] Movies without posters
- [ ] Empty search results
- [ ] No internet connection
- [ ] Rapid tab switching
- [ ] Multiple favorite toggles quickly

## 🐛 Bug Reporting Template

If you find issues, document them like this:

```
**Feature**: [e.g., Movie Search]
**Issue**: [Brief description]
**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected**: [What should happen]
**Actual**: [What actually happens]
**Device**: [iOS/Android, version]
**Screenshot**: [If applicable]
```

## 📊 Testing Results

After completing all tests, rate each area:
- ✅ Pass: Feature works as expected
- ⚠️ Warning: Minor issues, but functional
- ❌ Fail: Critical issues, not working

| Feature | Status | Notes |
|---------|--------|-------|
| Authentication | __ | |
| Home Screen | __ | |
| Movie Details | __ | |
| Search | __ | |
| Favorites | __ | |
| Profile | __ | |
| Dark Mode | __ | |
| Navigation | __ | |
| Persistence | __ | |
| Error Handling | __ | |

## 🎯 Acceptance Criteria

To pass, the app should:
- ✅ All critical paths work without errors
- ✅ Data persists correctly
- ✅ UI is responsive and attractive
- ✅ Forms validate properly
- ✅ Navigation flows logically
- ✅ Dark mode works system-wide
- ✅ No crashes during normal use

---

**Happy Testing! 🧪**
