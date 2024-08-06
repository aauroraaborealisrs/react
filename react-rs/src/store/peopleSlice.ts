import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character, mockPeople } from "../interfaces";



interface PeopleState {
  searchTerm: string;
  people: Character[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  storedSearchTerm: string;
  selectedItems: Character[];
}

const initialState: PeopleState = {
  searchTerm: "",
  people: mockPeople,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  storedSearchTerm: "",
  selectedItems: [],
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setStoredSearchTerm(state, action: PayloadAction<string>) {
      state.storedSearchTerm = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPeople(state, action: PayloadAction<Character[]>) {
      state.people = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    selectItem(state, action: PayloadAction<Character>) {
      if (!state.selectedItems.some((item) => item.name === action.payload.name)) {
        state.selectedItems.push(action.payload);
      }
    },
    unselectItem(state, action: PayloadAction<string>) {
      state.selectedItems = state.selectedItems.filter((item) => item.name !== action.payload);
    },
    unselectAllItems(state) {
      state.selectedItems = [];
    },
  },
});

export const {
  setSearchTerm,
  setStoredSearchTerm,
  setCurrentPage,
  setPeople,
  setTotalPages,
  selectItem,
  unselectItem,
  unselectAllItems,
} = peopleSlice.actions;
export default peopleSlice.reducer;
