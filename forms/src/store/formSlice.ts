import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  picture: string;
  country: string;
}

export interface FormState {
  uncontrolled: FormData | null;
  controlled: FormData | null;
}

const initialState: FormState = {
  uncontrolled: null,
  controlled: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveUncontrolledForm(state, action: PayloadAction<FormData>) {
      state.uncontrolled = action.payload;
    },
    saveControlledForm(state, action: PayloadAction<FormData>) {
      state.controlled = action.payload;
    },
  },
});

export const { saveUncontrolledForm, saveControlledForm } = formSlice.actions;
export default formSlice.reducer;
