import { createContext, useContext, useReducer } from 'react';
const initialEntry = [];
const CartContext = createContext();
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      console.log(state.length);
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
    default:
      return state;
  }
}
export const CartProvider = ({ children }) => {
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

  return (
    <CartContext.Provider
      value={{ cart, handleAdd, handleUpdate, handleComplete }}
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
