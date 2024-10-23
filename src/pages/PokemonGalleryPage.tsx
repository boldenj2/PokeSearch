import React, {useState} from "react";
import PokemonCardGallery from "../components/PokemonCardGallery";
import TypeSelector from "../components/TypeSelector";
import PokemonModal from "../components/PokemonModal";
import {getPokemonByType, getPokemonByNameOrID, getAllPokemon} from "../api/pokemonService";
import "../styles/pokemonGalleryPage.css";
import {Pokemon} from "../components/PokemonModal";

function PokemonGalleryPage() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [selectedType, setSelectedType] = useState<string>('All Types');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [currentIndex, setCurrentIndex] = useState<number>(0);


    const handleTypeChange = async (type: string) => {
        setSelectedType(type);
        let pokemon: Pokemon[] = [];
        if (type && type !== 'All Types') {
            pokemon = await getPokemonByType(type);
          
        } else {
            pokemon = await getAllPokemon(); 
        }
        if (Array.isArray(pokemon)) {
            setPokemonList(pokemon);
        } else {
            setPokemonList([]);
        }
    };

    const handlePokemonModalOpen = async(pokemon: Pokemon) => {
        try {
            setCurrentIndex(pokemonList.findIndex((p) => p.id === pokemon.id));
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching Pokémon data');
        }
    };

    const handleIndexChange = (index: number) => {
        setCurrentIndex(index);
    };

    const handlePokemonModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSortOrderChange = (order : 'asc' | 'desc') => {
        setSortOrder(order);
    }

    const sortedPokemonList = [...pokemonList].sort((a, b) => {
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
    });

    return (
        <div >
            <div className='Gallery-Page'>
                <h1>Pokémon Gallery</h1> 
                <TypeSelector selectedType={selectedType} onTypeChange={handleTypeChange} />

                {/*SortOrder*/}
                <div className="Sort-Order">
                    <button 
                        onClick={() => handleSortOrderChange('asc')} 
                        className={sortOrder === 'asc' ? 'active' : ''}
                    >
                        Sort by ID (Ascending)
                    </button>
                    <button 
                        onClick={() => handleSortOrderChange('desc')} 
                        className={sortOrder === 'desc' ? 'active' : ''}
                    >
                        Sort by ID (Descending)
                    </button>
                </div>

                {/*PokemonList*/}
                <div className="Pokemon-Container">
                {sortedPokemonList.map((pokemon) => (
                    <div key={pokemon.id} onClick={() => handlePokemonModalOpen(pokemon)}>
                        <PokemonCardGallery idOrName={pokemon.name} />
                    </div>
                ))}
                </div>
            </div>
            <PokemonModal
                pokemonList={sortedPokemonList} 
                currentIndex={currentIndex}
                isOpen={isModalOpen}
                onClose={handlePokemonModalClose}
                onIndexChange={handleIndexChange}
            /> 
        </div>
    );
}

export default PokemonGalleryPage;
