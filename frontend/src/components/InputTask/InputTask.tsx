/* eslint-disable no-restricted-globals */
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import "./InputTask.css";
import { IInputTaskProps } from "../../types/task";
import { useAppDispatch } from "../../redux/hooks";
import { removeTask } from "../../redux/thunk/removeTask";
import { updateTask } from "../../redux/thunk/updateTask";

export const InputTask: React.FC<IInputTaskProps> = ({
  id,
  title,
  isCompleted,
}: IInputTaskProps) => {
  const [checked, setChecked] = useState<boolean>(isCompleted);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(title);

  const dispatch = useAppDispatch();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleUpdateTitle = () => {
    dispatch(updateTask({ id, title: value }));
    setIsEditMode(false);
  };

  const handleRemoveTask = () => {
    if (confirm("Вы уверены, что хотите удалить?")) {
      dispatch(removeTask(id));
    }
  };

  const handleChangeCompleted = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    dispatch(updateTask({ id, isCompleted: newChecked }));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleUpdateTitle();
    }
  };

  return (
    <div className="wrapperTask">
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChangeCompleted}
        />

        {isEditMode ? (
          <input
            type="text"
            value={value}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <h3>{value}</h3>
        )}
      </label>

      <div className="buttonGroup">
        {isEditMode ? (
          <>
            <button
              arial-label="Save"
              onClick={handleUpdateTitle}
              className="inputTaskButton saveButton"
            >
              Сохранить
            </button>
            <button
              arial-label="Cancel"
              onClick={() => setIsEditMode(false)}
              className="inputTaskButton cancelButton"
            >
              Отмена
            </button>
          </>
        ) : (
          <button
            arial-label="Edit"
            onClick={() => setIsEditMode(true)}
            className="inputTaskButton editButton"
          >
            Редактировать
          </button>
        )}
        <button
          arial-label="Remove"
          onClick={handleRemoveTask}
          className="inputTaskButton removeButton"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};
