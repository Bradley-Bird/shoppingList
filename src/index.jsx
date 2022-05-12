import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/';
import { CartProvider } from './context/CartContext';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2E4052',
      light: '#E7ECF2',
    },
    secondary: {
      main: '#FFC857',
    },
    background: { default: '#FFFFFF' },
  },
});

render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
