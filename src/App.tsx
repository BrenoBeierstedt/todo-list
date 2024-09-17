import React from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import useTodo from "./hooks/todo.hooks";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const { tasks, addTodo, deleteTodo, doneTodo, editTodo } = useTodo();
  const drag = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    doneTodo(+result.draggableId)
  }
  return (
    <DragDropContext onDragEnd={(e) => { drag(e) }}>

      <div className="App">
        <span className="heading">Taskify</span>
        <InputField addTodo={addTodo} />
        <TodoList
          todos={tasks}
          deleteTodo={deleteTodo}
          doneTodo={doneTodo}
          editTodo={editTodo}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
