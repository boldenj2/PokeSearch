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
        </div>
    );
}

export default PokemonSearchPage;
