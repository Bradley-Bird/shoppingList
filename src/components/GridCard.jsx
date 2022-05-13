import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Switch,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useCart } from '../context/CartContext';

function GridCard({ item }) {
  const {
    handleUpdate,
    handleComplete,
    handleDelete,
    setHeaderUpdate,
    headerUpdate,
  } = useCart();

  const [editing, setEditing] = useState(false);

  const [newEntry, setNewEntry] = useState(item.entry);

  const handleEdit = () => {
    setEditing(!editing);
  };
  const update = (e) => {
    e.preventDefault();
    handleUpdate({
      ...item,
      entry: newEntry,
    });
    setEditing(false);
  };

  const handleSwitch = (e) => {
    handleComplete({ ...item, done: e.target.checked });
    setHeaderUpdate(!headerUpdate);
  };

  let cardContent;
  if (editing) {
    cardContent = (
      <Box component="form" onSubmit={update} noValidate sx={{ mt: 1 }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="add cart item"
            label="Need to change something?"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
          />
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
          {item?.done === true ? (
            <Typography color="#da1b2b">
              <CheckIcon color="primary" />
              In cart
            </Typography>
          ) : (
            <Typography color="primary">Not in cart</Typography>
          )}
        </CardContent>
        <CardActions>
          <Button onClick={handleEdit} size="small">
            Edit
          </Button>
          <Button onClick={() => handleDelete(item.id)} size="small">
            Delete
          </Button>
          <Switch
            color="secondary"
            checked={item.done}
            onChange={handleSwitch}
            inputProps={{ 'aria-label': 'controlled' }}
          />
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
          backgroundColor: '#d2d5dd',
        }}
      >
        {cardContent}
      </Card>
    </Grid>
  );
}

export default GridCard;
