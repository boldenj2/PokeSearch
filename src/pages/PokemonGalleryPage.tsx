import React, {useState} from "react";
import PokemonCardGallery from "../components/PokemonCardGallery";
import TypeSelector from "../components/TypeSelector";
import PokemonModal from "../components/PokemonModal";
import {getPokemonByType, getPokemonByNameOrID} from "../api/pokemonService";
import "../styles/pokemonGalleryPage.css";

function PokemonGalleryPage() {
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleTypeChange = async (type: string) => {
        setSelectedType(type);
        if (type) {
            const pokemons = await getPokemonByType(type);
            setPokemonList(pokemons);
        } else {
            setPokemonList([]); 
        }
    };

    const handlePokemonModalOpen = async(pokemon: any) => {
        try {
            const fullPokemon = await getPokemonByNameOrID(pokemon);
            setSelectedPokemon(fullPokemon);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching Pokémon data');
        }
    };

    const handlePokemonModalClose = () => {
        setIsModalOpen(false);
        setSelectedPokemon(null);
    };

    return (
        <div >
            <h1>Pokémon Gallery</h1> 
            <div className='Gallery-Page'>
                <TypeSelector selectedType={selectedType} onTypeChange={handleTypeChange} />
                <div className="Pokemon-Container">
                {pokemonList.map((pokemon, index) => (
                    <div key={index} onClick={() => handlePokemonModalOpen(pokemon)}>
                        <PokemonCardGallery key={index} idOrName={pokemon} />
                    </div>
                   
                ))}
                </div>
            </div>
        
            <PokemonModal pokemon={selectedPokemon} isOpen={isModalOpen} onClose={handlePokemonModalClose} />
          
        </div>
    );
}

export default PokemonGalleryPage;
