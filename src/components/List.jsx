import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import { useTodos } from '../context/TodoContext';

function List() {
  const { todos } = useTodos();
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {todos.length > 1 &&
          todos.map((todo) => (
            <Grid item key={todo.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {todo.entry}
                  </Typography>
                  <Typography>
                    {todo.done === true ? 'Completed' : 'Not finished'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                  <Button size="small">Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default List;
