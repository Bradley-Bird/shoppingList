import { Container, Grid } from '@mui/material';
import { useCart } from '../context/CartContext';
import GridCard from './GridCard';

function List() {
  const { cart } = useCart();

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {cart.map((item) => (
          <GridCard key={item.id} item={item} />
        ))}
      </Grid>
    </Container>
  );
}

export default List;
