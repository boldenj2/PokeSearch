import React, {useEffect, useState} from "react";
import PokemonCardGallery from "../components/PokemonCardGallery";
import TypeSelector from "../components/TypeSelector";
import PokemonModal from "../components/PokemonModal";
import {getPokemonByType, getAllPokemon} from "../api/pokemonService";
import "../styles/pokemonGalleryPage.css";
import {Pokemon} from "../components/PokemonModal";

function PokemonGalleryPage() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handleTypeChange = (type: string) => {
        setSelectedTypes(prevSelected => {
            if (prevSelected.includes(type)) {
                return prevSelected.filter(t => t !== type);
            } else {
                return [...prevSelected, type];
            }
        });
    };

    useEffect(() => {
        const fetchPokemon = async () => {
            let pokemon: Pokemon[] = [];
    
            if (selectedTypes.length > 0) {
                // Fetch Pokémon for all selected types
                for (const type of selectedTypes) {
                    const typePokemon = await getPokemonByType(type);
                    if (Array.isArray(typePokemon)) {
                        pokemon = [...pokemon, ...typePokemon];
                    }
                }
    
                // Remove duplicates by ID
                const uniquePokemonMap = new Map<number, Pokemon>();
                pokemon.forEach((p) => uniquePokemonMap.set(p.id, p));
                pokemon = Array.from(uniquePokemonMap.values());
            } else {
                // Fetch all Pokémon if no types are selected
                pokemon = await getAllPokemon();
                setPokemonList(pokemon);
            }
        };
    
        fetchPokemon();
    }, [selectedTypes])


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

    const filteredPokemonList = selectedTypes.length > 0 
    ? pokemonList.filter(pokemon => 
        selectedTypes.some(type => pokemon.types.some(t => t.type.name === type))
      )
    : pokemonList;

    const sortedPokemonList = [...filteredPokemonList].sort((a, b) => {
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
    });

    return (
        <div >
            <div className='Gallery-Page'>
                <h1>Pokémon Gallery</h1> 
                <TypeSelector selectedTypes={selectedTypes} onTypeChange={handleTypeChange} />

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
