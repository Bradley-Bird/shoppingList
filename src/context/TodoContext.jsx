import { createContext, useContext, useReducer } from 'react';
const initialEntry = [];
const TodoContext = createContext();
function todoReducer(state, action) {
  console.log(state);
  switch (action.type) {
    case 'ADD':
      console.log(state.length);
      return [{ id: Date.now(), entry: action.payload, done: false }, ...state];

    default:
      return state;
  }
}
export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, initialEntry);

  const handleAdd = (input) => {
    dispatch({ type: 'ADD', payload: input });
  };
  return (
    <TodoContext.Provider value={{ todos, handleAdd }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (context === undefined) throw new Error('useTodos must be in a Provider');
  return context;
};
