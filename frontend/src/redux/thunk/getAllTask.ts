import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllTask = createAsyncThunk(
    "tasks/getTasks",
    async () => {
        try {
            await new Promise<void>((resolve: () => void) => setTimeout(resolve, 1000)) // Искуственная задержка подгрузки данных.
            const response = await fetch("http://localhost:6622/all-tasks", {
                credentials: "include",
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Все задачи: ', result);
                return result;
            }
        } catch (error) {
            console.log("Ошибка получения всех задач!", error);
            return null;
        }
    }
);