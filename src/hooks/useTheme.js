import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../theme';

export const useTheme = () => {
  const themeMode = useSelector((state) => state.theme.theme);
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  return { theme, isDark: themeMode === 'dark' };
};
