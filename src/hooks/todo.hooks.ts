import { useReducer } from "react";
import todoReducer, { TodoAction } from "../reducers/todo.reducer";

const useTodo = () => {
  const [tasks, dispatch] = useReducer(todoReducer, []);

  const addTodo = (description: string) => {
    dispatch({ type: TodoAction.ADD, payload: description });

  };
  const deleteTodo = (id: number) => {
    dispatch({ type: TodoAction.DELETE, payload: { id: id } });

  };
  const doneTodo = (id: number) => {
    dispatch({ type: TodoAction.DONE, payload: { id: id } });

  };
  const editTodo = (id: number, description: string) => {
    dispatch({ type: TodoAction.EDIT, payload: { id: id, description: description } });

  };

  return { tasks, addTodo, deleteTodo, doneTodo, editTodo };
};

export default useTodo;
