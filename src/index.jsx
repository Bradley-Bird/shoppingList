import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/';
import { CartProvider } from './context/CartContext';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3d413a',
      light: '#d2d5dd',
    },
    secondary: {
      main: '#999ac6',
    },
    background: { default: '#E8EBE4' },
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
