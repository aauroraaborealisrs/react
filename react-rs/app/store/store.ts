"use client";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

type Character = {
  name: string;
  url: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  gender?: string;
};

type CharactersState = {
  selectedCharacters: Character[];
};

const initialState: CharactersState = {
  selectedCharacters: [],
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    toggleCharacterSelection: (state, action: PayloadAction<Character>) => {
      const character = action.payload;
      const isSelected = state.selectedCharacters.find(
        (c) => c.url === character.url,
      );
      if (isSelected) {
        state.selectedCharacters = state.selectedCharacters.filter(
          (c) => c.url !== character.url,
        );
      } else {
        state.selectedCharacters.push(character);
      }
    },
    unselectAll: (state) => {
      state.selectedCharacters = [];
    },
  },
});

export const { toggleCharacterSelection, unselectAll } =
  charactersSlice.actions;

export const store = configureStore({
  reducer: {
    characters: charactersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;