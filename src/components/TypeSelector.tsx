import React from 'react';

interface TypeSelectorProps {
  selectedTypes: string[];
  onTypeChange: (type: string) => void;
}

function TypeSelector({ selectedTypes, onTypeChange }: TypeSelectorProps) {
    const types = [
        { value: 'normal', label: 'Normal' },
        { value: 'fire', label: 'Fire' },
        { value: 'water', label: 'Water' },
        { value: 'grass', label: 'Grass' },
        { value: 'electric', label: 'Electric' },
        { value: 'ice', label: 'Ice' },
        { value: 'fighting', label: 'Fighting' },
        { value: 'poison', label: 'Poison' },
        { value: 'ground', label: 'Ground' },
        { value: 'flying', label: 'Flying' },
        { value: 'psychic', label: 'Psychic' },
        { value: 'bug', label: 'Bug' },
        { value: 'rock', label: 'Rock' },
        { value: 'ghost', label: 'Ghost' },
        { value: 'dragon', label: 'Dragon' },
        { value: 'dark', label: 'Dark' },
        { value: 'steel', label: 'Steel' },
        { value: 'fairy', label: 'Fairy' },
      ];
  
      return (
        <div className="Type-Selector">
          <h2>Select Pokémon Type</h2>
          <div className="Button-Container">
            {types.map((type) => (
              <button
                key={type.value || ''}
                className={`type-button ${selectedTypes.includes(type.value) ? 'active': ''}`}
                onClick={() => onTypeChange(type.value)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      );
    }
  
  export default TypeSelector;
