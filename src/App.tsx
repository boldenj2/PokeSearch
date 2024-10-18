import React, {useState} from 'react';
import PokemonCard from './components/pokemonCard';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState<string>('');
  const [submittedPokemon, setSubmittedPokemonName] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemon(event.target.value);
  };

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSubmittedPokemonName(pokemon);
    }
  };


  return (
    <div>
      <h1>MP2</h1>
      <input type='text' placeholder='Enter Pokémon name or ID' value={pokemon} onChange={handleInputChange} onKeyPress={handleSubmit} />
      <PokemonCard idOrName={submittedPokemon} />
    </div>

  );
}

export default App;
