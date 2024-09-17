import React, { useRef, useState } from "react";
import "./styles.css";

interface Props {
  addTodo: (description: string) => void;
}

const InputField: React.FC<Props> = ({ addTodo }) => {
  const [todo, setTodo] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(todo);
    setTodo("");
  };

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        type="input"
        placeholder="Enter a task"
        className="input__box"
        ref={inputRef}
      />
      <button className="input_submit" type="submit">
        Add
      </button>
    </form>
  );
};

export default InputField;
