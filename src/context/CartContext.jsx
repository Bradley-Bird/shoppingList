import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

const initialEntry = [];
const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [{ id: Date.now(), entry: action.payload, done: false }, ...state];
    case 'UPDATE':
      return state.map((item) => {
        if (item.id === action.payload.id) {
          const { entry } = action.payload;

          return { ...item, entry };
        } else return item;
      });
    case 'CHECK':
      return state.map((item) => {
        if (item.id === action.payload.id) {
          const { done, entry } = action.payload;

          return { ...item, entry, done };
        } else return item;
      });
    case 'DELETE':
      return state.filter((item) => item.id !== action.payload);
    case 'LOCAL_STORAGE':
      return action.payload.map((item) => ({
        id: item.id,
        entry: item.entry,
        done: item.done,
      }));
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [headerUpdate, setHeaderUpdate] = useState(true);
  const [cart, dispatch] = useReducer(cartReducer, initialEntry);

  const handleAdd = (input) => {
    dispatch({ type: 'ADD', payload: input });
  };
  const handleUpdate = (update) => {
    dispatch({ type: 'UPDATE', payload: update });
  };
  const handleComplete = (checked) => {
    dispatch({ type: 'CHECK', payload: checked });
  };
  const handleDelete = (id) => {
    dispatch({ type: 'DELETE', payload: id });
    setHeaderUpdate(!headerUpdate);
  };
  useEffect(() => {
    if (cart !== initialEntry)
      localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      dispatch({ type: 'LOCAL_STORAGE', payload: cart });
      setHeaderUpdate(!headerUpdate);
    }
  }, []);
  return (
    <CartContext.Provider
      value={{
        cart,
        handleAdd,
        handleUpdate,
        handleComplete,
        handleDelete,
        headerUpdate,
        setHeaderUpdate,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) throw new Error('useTodos must be in a Provider');
  return context;
};
