import { Todo } from "../components/models/model";

export enum TodoAction {
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
  DONE = "done",
  LIST_COMPLETED = "list_completed"
}

type TodoActionType =
  | { type: TodoAction.ADD; payload: string }
  | { type: TodoAction.DELETE; payload: { id: number } }
  | { type: TodoAction.DONE; payload: { id: number } }
  | { type: TodoAction.EDIT; payload: { id: number; description: string } }
  | { type: TodoAction.LIST_COMPLETED }


const todoReducer = (state: Todo[], action: TodoActionType) => {
  switch (action.type) {
    case TodoAction.ADD:
      return [
        ...state,
        { id: Date.now(), description: action.payload, isDone: false },
      ];
    case TodoAction.DELETE:
      return state.filter((todo) => todo.id !== action.payload.id);
    case TodoAction.EDIT:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, description: action.payload.description }
          : todo
      );
    case TodoAction.DONE:
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, isDone: !todo.isDone } : todo
      );
    default:
      return state;
  }
};

export default todoReducer;
