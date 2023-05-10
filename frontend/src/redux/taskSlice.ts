import { createSlice } from "@reduxjs/toolkit";
import { IState } from "../types/task";
import { getAllTask } from "./thunk/getAllTask";
import { newTask } from "./thunk/newTask";
import { removeTask } from "./thunk/removeTask";
import { updateTask } from "./thunk/updateTask";

export const initialState: IState = {
    tasks: [],
    loading: false,
};

const taskSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllTask.fulfilled, (state, action) => {
                state.tasks = [...action.payload]
                state.loading = false;
            })
            .addCase(newTask.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(newTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
                state.loading = false;
            })
            .addCase(updateTask.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                );
                state.loading = false;
            })
            .addCase(removeTask.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
                state.loading = false;
            })
            .addDefaultCase(() => { })
    }
});

export default taskSlice.reducer;
