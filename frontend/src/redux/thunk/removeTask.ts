import { createAsyncThunk } from "@reduxjs/toolkit";

export const removeTask = createAsyncThunk(
    "tasks/removeTask",
    async (id: number) => {
        try {
            const response = await fetch("http://localhost:6622/task", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
                credentials: "include",
            });
            if (response.ok) {
                const result = await response.json();
                console.log(`Задача с ${result.taskId} ID, была удалена`);
                return result.taskId;
            }
        } catch (error) {
            console.log(`Ошибка удаления ${id} задачи!`, error);
            return null;
        }
    }
);
