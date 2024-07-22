import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character } from '../interfaces';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPeople: builder.query<{ results: Character[], count: number }, { searchQuery: string, page: number }>({
      query: ({ searchQuery, page }) => `people/?search=${searchQuery}&page=${page}`,
    }),
    getPerson: builder.query<{ results: Character[] }, string>({
      query: (name) => `people/?search=${name}`,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = api;
