import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../interfaces";

export interface ProfileState {
  person: Character | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  person: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (name: string) => {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${name}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results[0] || null;
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<Character | null>) => {
          state.loading = false;
          state.person = action.payload;
        },
      )
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch profile";
      });
  },
});

export default profileSlice.reducer;
