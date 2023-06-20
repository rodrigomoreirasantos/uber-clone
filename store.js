import { configureStore } from "@reduxjs/toolkit";
import navReducer from './slice/NavSlice';

export const store = configureStore({
    reducer: {
        nav: navReducer
    }
})