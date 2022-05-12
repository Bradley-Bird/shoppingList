import React, { useState } from 'react';
import { Container, Box, TextField, Button, CssBaseline } from '@mui/material';
import { useTodos } from '../context/TodoContext';

function Form() {
  const [todo, setTodo] = useState('');
  const { handleAdd } = useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd(todo);
    setTodo('');
  };

  return (
    <Container>
      <CssBaseline />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="add todo"
          label="What do we want to get done today?"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
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
