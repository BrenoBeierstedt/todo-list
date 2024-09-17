import React from "react";
import "./styles.css";
import { Todo } from "./models/model";
import SingleTask from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface TodoProps {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  doneTodo: (id: number) => void;
  editTodo: (id: number, description: string) => void;
}

const TodoList: React.FC<TodoProps> = ({
  todos,
  deleteTodo,
  doneTodo,
  editTodo,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="todo">
        {(provided, snapshot) => (
          <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">
              Active Tasks
            </span>
            {todos.map((todo, index) =>
              !todo.isDone ?
                <SingleTask
                  index={index}
                  todo={todo}
                  key={todo.id}
                  todos={todos}
                  deleteTodo={deleteTodo}
                  doneTodo={doneTodo}
                  editTodo={editTodo} />
                : false
            )}
            {provided.placeholder}
          </div>

        )}

      </Droppable>
      <Droppable droppableId="todo-completed">
        {(provided, snapshot) => (
          <div className={`todos remove ${snapshot.isDraggingOver ? "dragremove" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">
              Completed Tasks
            </span>
            {todos.map((todo, index) =>
              todo.isDone ?
                <SingleTask
                  index={index}
                  todo={todo}
                  key={todo.id}
                  todos={todos}
                  deleteTodo={deleteTodo}
                  doneTodo={doneTodo}
                  editTodo={editTodo} />
                : false
            )}
            {provided.placeholder}

          </div>
        )
        }

      </Droppable >

    </div>
  );
};

export default TodoList;
