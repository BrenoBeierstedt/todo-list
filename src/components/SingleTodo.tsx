import React, { useEffect, useRef, useState } from "react";
import { Todo } from "./models/model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

interface SingleTodoProps {
  todo: Todo;
  key: number;
  todos: Todo[];
  index: number;
  deleteTodo: (id: number) => void;
  doneTodo: (id: number) => void;
  editTodo: (id: number, description: string) => void;
}

const SingleTask: React.FC<SingleTodoProps> = ({
  todo,
  index,
  deleteTodo,
  doneTodo,
  editTodo,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(todo.description);

  const handleDone = (id: number) => {
    doneTodo(id);
  };
  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    editTodo(id, editTask);
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} onSubmit={(e) => handleEdit(e, todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          {edit ? (
            <input
              ref={inputRef}
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.description}</s>
          ) : (
            <span className="todos__single--text">{todo.description}</span>
          )}

          <div>
            {todo.isDone ? (
              <></>
            ) : (
              <span
                className="icon"
                onClick={() => {
                  if (!edit && !todo.isDone) {
                    setEdit(!edit);
                  }
                }}
              >
                <AiFillEdit />
              </span>
            )}
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>

            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}

    </Draggable>
  );
};

export default SingleTask;
