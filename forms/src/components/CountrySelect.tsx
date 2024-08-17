import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface CountrySelectProps {
  onSelectCountry: (country: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ onSelectCountry }) => {
  const countries = useSelector((state: RootState) => state.countries.countries);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    
    if (value) {
      const filtered = countries.filter((country) =>
        country.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };

  const handleSelect = (country: string) => {
    setSearchTerm(country);
    setFilteredCountries([]);
    onSelectCountry(country);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for a country"
      />
      {filteredCountries.length > 0 && (
        <ul style={{ border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto', padding: '0', margin: '0', listStyle: 'none' }}>
          {filteredCountries.map((country) => (
            <li
              key={country}
              onClick={() => handleSelect(country)}
              style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#fff', borderBottom: '1px solid #ccc' }}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountrySelect;
