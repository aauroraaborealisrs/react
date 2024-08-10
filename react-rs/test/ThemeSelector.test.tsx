import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTheme } from '../src/hooks/useTheme';
import ThemeSelector from '../src/context/ThemeSelector';

jest.mock('../src/hooks/useTheme');

describe('ThemeSelector Component', () => {
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the theme options correctly', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeSelector />);

    expect(screen.getByLabelText('Light')).toBeInTheDocument();
    expect(screen.getByLabelText('Dark')).toBeInTheDocument();
    expect(screen.getByLabelText('Light')).toBeChecked();
    expect(screen.getByLabelText('Dark')).not.toBeChecked();
  });

  it('calls toggleTheme when "Light" theme is selected', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeSelector />);

    const lightRadio = screen.getByLabelText('Light');
    fireEvent.click(lightRadio);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('calls toggleTheme when "Dark" theme is selected', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeSelector />);

    const darkRadio = screen.getByLabelText('Dark');
    fireEvent.click(darkRadio);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('checks the correct radio button based on the current theme', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeSelector />);

    expect(screen.getByLabelText('Dark')).toBeChecked();
    expect(screen.getByLabelText('Light')).not.toBeChecked();
  });
});
