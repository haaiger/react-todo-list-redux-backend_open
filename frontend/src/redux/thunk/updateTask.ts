import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUpdateTaskPayload } from "../../types/task";

export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async ({ id, title, isCompleted }: IUpdateTaskPayload) => {
        try {
            const response = await fetch("http://localhost:6622/task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, title, isCompleted }),
                credentials: "include",
            });
            if (response.ok) {
                const result = await response.json();
                console.log("Обновилась задача", result.updatedTask.id);
                return result.updatedTask;
            }
        } catch (error) {
            console.log(`Ошибка обновления ${id} задачи!`, error);
            return null;
        }
    }
);
