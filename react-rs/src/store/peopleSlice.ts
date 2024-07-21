import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../interfaces';

interface PeopleState {
  searchTerm: string;
  people: Character[];
  error: string | null;
  loading: boolean;
  totalPages: number;
  currentPage: number;
  storedSearchTerm: string;
}

const initialState: PeopleState = {
  searchTerm: '',
  people: [],
  error: null,
  loading: false,
  totalPages: 1,
  currentPage: 1,
  storedSearchTerm: ''
};

export const fetchPeople = createAsyncThunk(
  'people/fetchPeople',
  async ({ searchQuery, currentPage }: { searchQuery: string; currentPage: number }) => {
    const query = searchQuery.trim()
      ? `?search=${searchQuery.trim()}&page=${currentPage}`
      : `?page=${currentPage}`;
    const response = await fetch(`https://swapi.dev/api/people/${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  }
);

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setStoredSearchTerm: (state, action: PayloadAction<string>) => {
      state.storedSearchTerm = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.loading = false;
        state.people = action.payload.results || [];
        state.totalPages = Math.ceil(action.payload.count / 10);
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch people';
      });
  }
});

export const {
  setSearchTerm,
  setStoredSearchTerm,
  setCurrentPage,
  setTotalPages
} = peopleSlice.actions;

export default peopleSlice.reducer;
