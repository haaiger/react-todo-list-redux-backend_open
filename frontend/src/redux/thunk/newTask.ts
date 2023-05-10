import { createAsyncThunk } from "@reduxjs/toolkit";

export const newTask = createAsyncThunk(
    "tasks/newTask",
    async (title: string) => {
        try {
            const response = await fetch("http://localhost:6622/new-task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title }),
                credentials: "include",
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Новая задача: ', result.newTask);
                return result.newTask;
            }
        } catch (error) {
            console.log("Ошибка создания новой задачи!", error);
            return null;
        }
    }
);
