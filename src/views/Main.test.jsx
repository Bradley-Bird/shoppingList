import { ThemeProvider, createTheme } from '@mui/material/';
import { CartProvider } from '../context/CartContext';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

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

describe('<App />', () => {
  it('displays a form, adds to a list on save, edits and deletes list items', () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider>
    );

    //inputting items
    const input = screen.getByRole('textbox', {
      name: /what do we want to shop for today\?/i,
    });
    userEvent.type(input, 'pizza');
    const save = screen.getByRole('button', { name: /save/i });
    userEvent.click(save);
    //finding cards after submitting items
    screen.getByRole('heading', { name: /pizza/i });
    screen.getByText(/not in cart/i);

    //testing if the switch completes getting item
    const completeSwitch = screen.getByRole('checkbox', {
      name: /controlled/i,
    });
    userEvent.click(completeSwitch);
    screen.getByText(/in cart/i);
    userEvent.click(completeSwitch);
    screen.getByText(/not in cart/i);
    //testing edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    userEvent.click(editButton);
    const editInput = screen.getByRole('textbox', {
      name: /need to change something\?/i,
    });
    const typed = userEvent.type(editInput, '{space}with pepperoni');
    expect(typed).toBeInTheDocument;
    const updateButton = screen.getByRole('button', { name: /update/i });
    userEvent.click(updateButton);
    screen.getByRole('heading', { name: /pizza with pepperoni/i });
    // testing delete button
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    userEvent.click(deleteButton);
    const deletedPost = screen.queryByRole('heading', {
      name: /pizza with pepperoni/i,
    });
    expect(deletedPost).not.toBeInTheDocument();
  });
});
