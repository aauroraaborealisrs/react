import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterDetail from '../src/components/CharacterDetail';

describe('CharacterDetail Component', () => {
  const character = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
  };

  it('renders character details correctly', () => {
    render(<CharacterDetail character={character} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
    expect(screen.getByText('Hair Color: blond')).toBeInTheDocument();
    expect(screen.getByText('Skin Color: fair')).toBeInTheDocument();
    expect(screen.getByText('Eye Color: blue')).toBeInTheDocument();
    expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
  });

  it('renders the correct profile page structure', () => {
    const { container } = render(<CharacterDetail character={character} />);

    expect(container.firstChild).toHaveClass('profile-page');
  });
});
