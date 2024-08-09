
import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import fetchMock from 'jest-fetch-mock';
import { useRouter } from 'next/router';
import Search, { getServerSideProps, SearchProps } from "../src/pages/search";

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../src/components/CharacterList', () => () => <div>CharacterList Mock</div>);
jest.mock('../src/components/Layout', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

fetchMock.enableMocks();

describe('Search', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });
  });

  const mockProps: SearchProps = {
    characters: [
      { name: 'Luke Skywalker', url: '1' },
      { name: 'Darth Vader', url: '2' },
    ],
    query: 'skywalker',
    page: 1,
    next: 'next-page-url',
    previous: null,
  };

  it('renders correctly with characters and pagination', () => {
    render(<Search {...mockProps} />);

    expect(screen.getByText('CharacterList Mock')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables the Previous button when there is no previous page', () => {
    render(<Search {...mockProps} />);

    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('enables the Next button when there is a next page', () => {
    render(<Search {...mockProps} />);

    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  it('contains correct links for pagination buttons', () => {
    render(<Search {...mockProps} />);

    expect(screen.getByText('Previous').closest('a')).toHaveAttribute('href', '/search?query=skywalker&page=0');
    expect(screen.getByText('Next').closest('a')).toHaveAttribute('href', '/search?query=skywalker&page=2');
  });

  it('fetches data in getServerSideProps', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      results: [
        { name: 'Luke Skywalker', url: '1' },
        { name: 'Darth Vader', url: '2' },
      ],
      next: 'next-page-url',
      previous: null,
    }));

    const context = { query: { query: 'skywalker', page: '1' } };
    const result = await getServerSideProps(context as any);

    expect(result).toEqual({
      props: {
        characters: [
          { name: 'Luke Skywalker', url: '1' },
          { name: 'Darth Vader', url: '2' },
        ],
        query: 'skywalker',
        page: 1,
        next: 'next-page-url',
        previous: null,
      },
    });
  });
});
