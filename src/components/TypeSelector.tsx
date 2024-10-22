import React from 'react';

interface TypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({ selectedType, onTypeChange }) => {
    const types = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
  
    return (
        <div className='Type-Selector'>
            <h2>Select Pokémon Type</h2>
            <div className='Button-Container'>
                <button 
                    className={`type-button ${selectedType === '' ? 'active' : ''}`} 
                    onClick={() => onTypeChange('')}
                >
                    All Types
                </button>
                {types.map((type) => (
                    <button 
                        key={type} 
                        className={`type-button ${selectedType === type ? 'active' : ''}`} 
                        onClick={() => onTypeChange(type)}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalize first letter */}
                    </button>
                ))}
            </div>
        </div>
    );
};
  
  export default TypeSelector;
