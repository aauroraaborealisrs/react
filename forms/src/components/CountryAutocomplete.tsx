import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface CountryAutocompleteProps {
  onSelectCountry: (country: string) => void;
  selectedCountry: string;
}

const CountryAutocomplete: React.FC<CountryAutocompleteProps> = ({
  onSelectCountry,
  selectedCountry,
}) => {
  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );
  const [searchTerm, setSearchTerm] = useState(selectedCountry);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = countries.filter((country) =>
        country.toLowerCase().startsWith(value.toLowerCase()),
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
    <div className="country-div">
      <label htmlFor="country">Country: </label>
      <input
        id="country"
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for a country"
      />
      {filteredCountries.length > 0 && (
        <ul
          className="country-list"
          style={{
            maxHeight: "150px",
            overflowY: "auto",
            padding: "0",
            listStyle: "none",
          }}
        >
          {filteredCountries.map((country) => (
            <li
              key={country}
              onClick={() => handleSelect(country)}
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor: "#fff",
              }}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryAutocomplete;
