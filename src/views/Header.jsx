import React, { useEffect, useState } from 'react';
import { Toolbar, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useCart } from '../context/CartContext';

function Header() {
  const { cart, headerUpdate } = useCart();
  const [remainingItems, setRemainingItems] = useState(
    cart.length - (cart.done === true)
  );

  useEffect(() => {
    const doneItems = cart.filter((item) => item.done === true);

    setRemainingItems(cart.length - doneItems.length);
  }, []);
  useEffect(() => {
    const doneItems = cart.filter((item) => item.done === true);

    setRemainingItems(cart.length - doneItems.length);
  }, [headerUpdate]);

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          variant="body1"
          color="inherit"
          align="center"
          sx={{ flex: 1 }}
        >
          You have {remainingItems} items to go.
        </Typography>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          Total Items: {cart.length}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      ></Toolbar>
    </React.Fragment>
  );
}

export default Header;
