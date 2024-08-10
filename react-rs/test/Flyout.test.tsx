import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store, toggleCharacterSelection, unselectAll } from '../src/store/store';
import Flyout from '../src/components/Flyout';
import { createCSVBlob } from '../src/utils/csvutilsnew';

jest.mock('../src/utils/csvutilsnew', () => ({
  createCSVBlob: jest.fn(() => new Blob(['mocked csv content'], { type: 'text/csv' })),
}));

global.URL.createObjectURL = jest.fn(() => 'mocked-url');
global.URL.revokeObjectURL = jest.fn();

describe('Flyout Component', () => {
  beforeEach(() => {
    store.dispatch(unselectAll());
  });

  it('renders correctly when characters are selected', () => {
    const character = {
      name: 'Luke Skywalker',
      url: 'https://swapi.dev/api/people/1/',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };

    store.dispatch(toggleCharacterSelection(character));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('1 items are selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument();
  });

  it('does not render when no characters are selected', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByText('items are selected')).not.toBeInTheDocument();
  });

  it('unselects all characters when "Unselect all" button is clicked', () => {
    const character = {
      name: 'Luke Skywalker',
      url: 'https://swapi.dev/api/people/1/',
    };

    store.dispatch(toggleCharacterSelection(character));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect all'));

    expect(store.getState().characters.selectedCharacters).toHaveLength(0);
  });

  it('generates a CSV and triggers download when "Download" button is clicked', () => {
    const character = {
      name: 'Luke Skywalker',
      url: 'https://swapi.dev/api/people/1/',
    };

    store.dispatch(toggleCharacterSelection(character));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const downloadButton = screen.getByRole('button', { name: 'Download' });
    const downloadLink = screen.getByTestId('download-link');

    fireEvent.click(downloadButton);

    expect(createCSVBlob).toHaveBeenCalledWith([character]);
    expect(downloadLink).toHaveAttribute('href', 'mocked-url');
    expect(downloadLink).toHaveAttribute('download', '1_characters.csv');
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mocked-url');
  });
});
