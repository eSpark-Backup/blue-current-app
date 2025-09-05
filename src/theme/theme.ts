import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

export const MyDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#000',
    primary: '#00C9FF',
  },
};
