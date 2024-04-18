import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c232b3',
    },
    secondary: {
      main: '#4b0096', 
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#c232b3',
    },
    h5: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
