import { ThunkAction } from "redux-thunk";
import store from "../redux/store";
import { AnyAction } from "@reduxjs/toolkit";

export interface ITask {
    id: number;
    title: string;
    createdAt: number;
    isCompleted: boolean;
};

export interface IState {
    tasks: ITask[];
    loading: boolean;
}

export interface IToDoStore {
    tasks: ITask[];
    createTask: (title: string) => void;
    updateTask: (id: number, title: string) => void;
    removeTask: (id: number) => void;
}

export interface IInputPlusProps {
    id: number;
}

export interface IInputTaskProps {
    id: number;
    title: string;
    isCompleted: boolean;
}

export interface IUpdateTaskPayload {
    id: number;
    title?: string;
    isCompleted?: boolean;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>;