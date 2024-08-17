import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CountriesState {
  countries: string[];
}

export const initialState: CountriesState = {
    countries: [
        'United States',
        'Canada',
        'Mexico',
        'Germany',
        'France',
        'China',
        'Japan',
        'Australia',
        'Brazil',
        'India',
        'Italy',
        'Russia',
        'South Africa',
        'Spain',
        'Sweden',
        'Switzerland',
        'Argentina',
        'Belgium',
        'Chile',
        'Colombia',
        'Cuba',
        'Denmark',
        'Egypt',
        'Finland',
        'Greece',
        'Hungary',
        'Iceland',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Israel',
        'Kenya',
        'Korea North',
        'Korea South',
        'Malaysia',
        'Netherlands',
        'New Zealand',
        'Norway',
        'Pakistan',
        'Peru',
        'Philippines',
        'Poland',
        'Portugal',
        'Romania',
        'Saudi Arabia',
        'Singapore',
        'Thailand',
        'Turkey',
        'Ukraine',
        'United Kingdom',
        'Venezuela',
        'Vietnam'
      ]
      
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addCountry(state, action: PayloadAction<string>) {
      state.countries.push(action.payload);
    },
  },
});

export const { addCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
