import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E9692C', // Dark orange
    },
    secondary: {
      main: '#2374BF', // Blue
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
