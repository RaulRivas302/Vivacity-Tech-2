import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../../types/Person";

interface PersonState {
  person: Person | null;
}

const initialState: PersonState = {
  person: null,
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setPerson: (state, action: PayloadAction<Person | null>) => {
      state.person = action.payload;
    },
  },
});

export const { setPerson } = personSlice.actions;

export default personSlice.reducer;
