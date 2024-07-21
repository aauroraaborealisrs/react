import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./peopleSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
