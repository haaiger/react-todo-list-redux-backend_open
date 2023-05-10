import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import "./App.css";
import { InputPlus } from "../components/InputPlus/InputPlus";
import { InputTask } from "../components/InputTask/InputTask";
import { ITask, RootState } from "../types/task";
import { getAllTask } from "../redux/thunk/getAllTask";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const loading = useAppSelector((state: RootState) => state.tasks.loading);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    dispatch(getAllTask());
  }, []);

  const filteredTasks = useCallback(
    (tasks: ITask[]): ITask[] => {
      switch (filter) {
        case "completed":
          return tasks.filter((task: ITask) => task.isCompleted);
        case "active":
          return tasks.filter((task: ITask) => !task.isCompleted);
        default:
          return tasks;
      }
    },
    [filter]
  )(tasks);

  return (
    <article className="App">
      <h1>To Do List</h1>
      <section>
        <InputPlus />
      </section>

      <div className="buttonsContainer">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Все задачи
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Выполненные
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Не завершенные
        </button>
      </div>

      <section className="taskList">
        {loading && <div>Загрузка...</div>}
        {!loading && !filteredTasks.length && <p>Задач нет.</p>}
        {!loading &&
          filteredTasks.map((task: ITask) => (
            <InputTask key={task.id} {...task} />
          ))}
      </section>
    </article>
  );
};
