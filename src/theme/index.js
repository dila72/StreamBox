import { COLORS } from '../utils/constants';

export const lightTheme = {
  colors: {
    primary: COLORS.LIGHT.primary,
    secondary: COLORS.LIGHT.secondary,
    background: COLORS.LIGHT.background,
    surface: COLORS.LIGHT.surface,
    text: COLORS.LIGHT.text,
    textSecondary: COLORS.LIGHT.textSecondary,
    border: COLORS.LIGHT.border,
    card: COLORS.LIGHT.card,
    error: COLORS.LIGHT.error,
    success: COLORS.LIGHT.success,
    rating: COLORS.LIGHT.rating,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    primary: COLORS.DARK.primary,
    secondary: COLORS.DARK.secondary,
    background: COLORS.DARK.background,
    surface: COLORS.DARK.surface,
    text: COLORS.DARK.text,
    textSecondary: COLORS.DARK.textSecondary,
    border: COLORS.DARK.border,
    card: COLORS.DARK.card,
    error: COLORS.DARK.error,
    success: COLORS.DARK.success,
    rating: COLORS.DARK.rating,
  },
};

// Common styles
export const commonStyles = {
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadowLight: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
};
