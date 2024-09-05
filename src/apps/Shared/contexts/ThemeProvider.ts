import { Context, createContext, } from 'react';

export type ThemeType = 'dark' | 'light';

export type Theme = {
  theme: ThemeType;
  setTheme: (value: ThemeType) => void;
}

export const ThemeProvider: Context<Theme> = 
  createContext<Theme>(undefined as unknown as Theme);
ThemeProvider.displayName = 'ThemeProvider';