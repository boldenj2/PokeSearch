import React, {useState} from 'react';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import '../styles/pokemonSearchPage.css';

function PokemonSearchPage() {
    const [submittedPokemon, setSubmittedPokemonName] = useState<string>('');
    
    const handleSearch = (pokemonName: string) => {
        setSubmittedPokemonName(pokemonName);
    };
    
    return (
        <div className='Search-Page'>
            <h1>Pokémon Search</h1>
            <SearchBar onSearch={handleSearch} />
            <PokemonCard idOrName={submittedPokemon} />
            <img src="https://i.pinimg.com/originals/a4/c7/1c/a4c71c740ae5689e8ba3f8d6af90a6d0.gif" alt="mewtwo" />
        </div>
    );
}

export default PokemonSearchPage;
