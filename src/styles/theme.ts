import {DefaultTheme, useTheme} from 'react-native-paper';
import {Platform} from 'react-native';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      additional: {
        red: string;
        green: string;
        yellow: string;
      };
      neutral: {
        black: string;
        white: string;
        300: string;
        500: string;
        700: string;
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

export const SafeAreaPadding = Platform.OS === 'ios' ? 36 : 24;

export const SafeAreaTopPadding = Platform.OS === 'ios' ? 72 : 24;

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
    primary: '#AD94F4',
    secondary: '#FFA05C',
    tertiary: '#FFD02C',
    additional: {
      red: '#FF7878',
      green: '#7EDA6E',
      yellow: '#F3BE58',
    },
    neutral: {
      black: '#383838',
      300: '#EEEEEE',
      500: '#B8B8B8',
      600: '#808080',
      700: '#737373',
      white: '#FFFFFF',
    },
    semantic: {
      success: '#7EDA6E',
      warning: '#D1843D',
      error: '#DD4E4E',
      info: '#4D91D0',
    },
  },
};

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();

export default theme;
