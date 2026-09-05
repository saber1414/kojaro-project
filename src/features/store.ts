import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./users/users";
import articlesReducer from "./articles/articles";
import listsReducer from "./lists/lists";
import bannersReducer from "./banners/banners";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        articles: articlesReducer,
        lists: listsReducer,
        banners: bannersReducer,
    },
    devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;