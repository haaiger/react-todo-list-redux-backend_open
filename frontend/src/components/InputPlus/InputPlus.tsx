import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import './InputPlus.css';
import { useAppDispatch } from "../../redux/hooks";
import { newTask } from "../../redux/thunk/newTask";

export const InputPlus: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();

  const addTask = async () => {
    if (inputValue.trim() === "") {
      return;
    }
    dispatch(newTask(inputValue));
    setInputValue("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="inputPlusContainer">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="inputPlusField"
      />
      <button onClick={addTask} aria-label="Add" className="inputPlusButton">
        Добавить
      </button>
    </div>
  );
};
