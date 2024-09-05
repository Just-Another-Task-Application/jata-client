import { 
  useEffect,
  useContext,
  useCallback,
} from 'react';

import { Theme, ThemeProvider, ThemeType, } from '@Shared/contexts/ThemeProvider';

export const useTheme: () => Theme = () => {
  const { theme, setTheme } = useContext(ThemeProvider);

  const renderTheme: (theme: ThemeType) => void = (theme) => {
    if (theme === 'dark') document.body.classList.add('dark');
    if (theme === 'light') document.body.classList.remove('dark');
  }

  const handleUserFavoriteTheme: () => void = useCallback(() => {
    const isDarkFavorite = window
      .matchMedia('(prefers-color-scheme: dark)')
      .matches;
   
    const theme = isDarkFavorite ? 'dark' : 'light';
    renderTheme(theme);

    setTheme(theme);
  }, []);

  useEffect(() => {
    handleUserFavoriteTheme();
  }, [handleUserFavoriteTheme,]);

  useEffect(() => {
    renderTheme(theme);
  }, [theme,]);

  return {
    theme,
    setTheme,
  };
};