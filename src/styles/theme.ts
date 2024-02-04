import {DefaultTheme, useTheme} from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      neutral: {
        black: string;
        white: string;
        300: string;
        500: string;
      };
      semantic: {
        success: string;
        warning: string;
        error: string;
        info: string;
      };
    }

    interface Theme {}
  }
}

const theme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,
    headlineMedium: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: 34,
    },
    titleMedium: {
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 22,
    },
    titleLarge: {
      fontWeight: 500,
      fontSize: 18,
    },
    bodyMedium: {
      fontWeight: 300,
      fontSize: 14,
      lineHeight: 20,
    },
  },
  colors: {
    ...DefaultTheme.colors,
    primary: '#7F84E8',
    neutral: {
      black: '#383838',
      300: '#EEEEEE',
      500: '#808080',
      white: '#FFFFFF',
    },
    semantic: {
      success: '#45A560',
      warning: '#D1843D',
      error: '#DD4E4E',
      info: '#4D91D0',
    },
  },
};

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();

export default theme;
