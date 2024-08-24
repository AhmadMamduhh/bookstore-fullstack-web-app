import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5722', // Dark orange
    },
    secondary: {
      main: '#2196F3', // Blue
    },
    background: {
      default: '#F5F5F5', // Grey
      paper: '#FFFFFF', // White
    },
    text: {
      primary: '#000000', // Black
    },
  },
});

export default theme;
