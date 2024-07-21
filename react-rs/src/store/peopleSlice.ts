import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Character } from "../interfaces";

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
  people: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  storedSearchTerm: "",
  selectedItems: [],
};

export const fetchPeople = createAsyncThunk(
  "people/fetchPeople",
  async ({
    searchQuery,
    currentPage,
  }: {
    searchQuery: string;
    currentPage: number;
  }) => {
    const query = searchQuery.trim()
      ? `?search=${searchQuery.trim()}&page=${currentPage}`
      : `?page=${currentPage}`;
    const response = await fetch(`https://swapi.dev/api/people/${query}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return { results: data.results, count: data.count };
  },
);

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
    selectItem(state, action: PayloadAction<Character>) {
      if (
        !state.selectedItems.some((item) => item.name === action.payload.name)
      ) {
        state.selectedItems.push(action.payload);
      }
    },
    unselectItem(state, action: PayloadAction<string>) {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.name !== action.payload,
      );
    },
    unselectAllItems(state) {
      state.selectedItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.loading = false;
        state.people = action.payload.results;
        state.totalPages = Math.ceil(action.payload.count / 10);
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const {
  setSearchTerm,
  setStoredSearchTerm,
  setCurrentPage,
  selectItem,
  unselectItem,
  unselectAllItems,
} = peopleSlice.actions;
export default peopleSlice.reducer;
