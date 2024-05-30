import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    customColors: {
      brown: string;
      lightrose: string;
      cwhite: string;
      red: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffe4e6', // rose
    },
    secondary: {
      main: '#fda4af', // darkerrose
    },
    customColors: {
      brown: '#754328',
      lightrose: '#fff1f2',
      cwhite: '#ffffff',
      red: '#ef4444',
    },
  },
} as ThemeOptions);

export default theme;
