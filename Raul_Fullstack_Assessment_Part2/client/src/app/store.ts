import { configureStore } from "@reduxjs/toolkit";
import personReducer from "../features/person/personSlice.ts";

export const store = configureStore({
  reducer: {
    person: personReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
