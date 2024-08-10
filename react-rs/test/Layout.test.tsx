import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import Layout from '../src/components/Layout';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../src/context/ThemeSelector', () => () => <div>Mocked ThemeSelector</div>);
jest.mock('../src/components/Flyout', () => () => <div>Mocked Flyout</div>);

describe('Layout Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the ThemeSelector and Flyout components', () => {
    render(
      <Layout>
        <div>Child Component</div>
      </Layout>
    );

    expect(screen.getByText('Mocked ThemeSelector')).toBeInTheDocument();
    expect(screen.getByText('Mocked Flyout')).toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('updates search state on input change', () => {
    render(
      <Layout>
        <div>Child Component</div>
      </Layout>
    );

    const searchInput = screen.getByPlaceholderText('Search characters...') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'Luke Skywalker' } });
    expect(searchInput.value).toBe('Luke Skywalker');
  });

  it('redirects to search page on form submit', () => {
    render(
      <Layout>
        <div>Child Component</div>
      </Layout>
    );

    const searchInput = screen.getByPlaceholderText('Search characters...') as HTMLInputElement;
    const searchButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'Luke Skywalker' } });
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith('/search?query=Luke Skywalker');
  });
});
