// import { configureStore } from "@reduxjs/toolkit";
// import peopleReducer from "./peopleSlice";
// import profileReducer from "./profileSlice";
// import { api } from "../services/api";

// const store = configureStore({
//   reducer: {
//     people: peopleReducer,
//     profile: profileReducer,
//     [api.reducerPath]: api.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./peopleSlice";
import { api } from "../services/api";

const store = configureStore({
  reducer: {
    people: peopleReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
