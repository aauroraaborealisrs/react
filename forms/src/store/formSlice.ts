import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  picture: string;
  country: string;
  terms: boolean;
}

export interface FormState {
  uncontrolled: FormData[];
  controlled: FormData[];
}

const initialState: FormState = {
  uncontrolled: [],
  controlled: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveUncontrolledForm(state, action: PayloadAction<FormData>) {
      state.uncontrolled.push(action.payload);
    },
    saveControlledForm(state, action: PayloadAction<FormData>) {
      state.controlled.push(action.payload);
    },
  },
});

export const { saveUncontrolledForm, saveControlledForm } = formSlice.actions;
export default formSlice.reducer;
