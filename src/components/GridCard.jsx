import { useState } from 'react';
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
  TextField,
} from '@mui/material';

function GridCard({ item }) {
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(!editing);
  };

  let cardContent;
  if (editing) {
    cardContent = (
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="add cart item"
            label="Need to change something?"
            value={item.entry}
          />
          <Typography>
            {item.done === true ? 'Completed' : 'Not finished'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </Button>
        </CardActions>
      </Box>
    );
  } else {
    cardContent = (
      <>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {item?.entry}
          </Typography>
          <Typography>
            {item?.done === true ? 'Completed' : 'Not finished'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleEdit} size="small">
            Edit
          </Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </>
    );
  }

  return (
    <Grid item key={item.id} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {cardContent}
      </Card>
    </Grid>
  );
}

export default GridCard;
