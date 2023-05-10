import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./taskSlice";

const store = configureStore({
    reducer: {
        tasks: postSlice,
    },
});

export default store;