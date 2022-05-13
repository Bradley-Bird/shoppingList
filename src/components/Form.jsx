import React, { useState } from 'react';
import { Container, Box, TextField, Button, CssBaseline } from '@mui/material';
import { useCart } from '../context/CartContext';

function Form() {
  const [cart, setCart] = useState('');
  const { handleAdd, setHeaderUpdate, headerUpdate } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cart) return;
    handleAdd(cart);
    setCart('');
    setHeaderUpdate(!headerUpdate);
  };

  return (
    <Container>
      <CssBaseline />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="add cart item"
          label="What do we want to shop for today?"
          value={cart}
          onChange={(e) => setCart(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Save
        </Button>
      </Box>
    </Container>
  );
}

export default Form;
