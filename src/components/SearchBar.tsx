import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (pokemonName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(input);
      setInput(''); // Clear input after search
    }
  };

  return (
    <input
      type='text'
      placeholder='Enter Pokémon name or ID'
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={handleKeyPress}
    />
  );
};

export default SearchBar;
