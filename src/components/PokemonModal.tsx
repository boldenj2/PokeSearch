import React from "react";
import '../styles/pokemonModal.css';

export interface Pokemon {
    name: string;
    id: number;
    sprites: {
        front_default: string;
    };
    types: {
        type: {
            name: string;
        };
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
    abilities: {
        ability: {
            name: string;
        };
    }[]; 
}

interface PokemonModalProps {
    isOpen: boolean;
    onClose: () => void;
    pokemonList: Pokemon[];
    currentIndex: number;
    onIndexChange: (index: number) => void;
}

const capitalizeFirstLetter = (string: string) => {
    if (!string) return ''; // Handle empty strings
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

function PokemonModal({ isOpen, onClose, pokemonList, currentIndex, onIndexChange }: PokemonModalProps) {
    if (!isOpen || !pokemonList || pokemonList.length === 0) {
        return null;
    }

    const pokemon = pokemonList[currentIndex];

    const getTypeColor = (type: string) => {
        const typeColors: { [key: string]: string } = {
          normal: '#A8A77A',
          fire: '#EE8130',
          water: '#6390F0',
          grass: '#7AC74C',
          electric: '#F7D02C',
          ice: '#96D9D6',
          fighting: '#C22E28',
          poison: '#A33EA1',
          ground: '#E2BF65',
          flying: '#A98FF3',
          psychic: '#F95587',
          bug: '#A6B91A',
          rock: '#B6A136',
          ghost: '#735797',
          dragon: '#6F35FC',
          dark: '#705746',
          steel: '#B7B7CE',
          fairy: '#D685AD',
        };
        return typeColors[type];
    };

    const handleNext = () => {
        if (currentIndex < pokemonList.length - 1) {
            onIndexChange(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            onIndexChange(currentIndex - 1);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className='Modal'>
            <div className='Modal-Content'>
                <span className='Close' onClick={onClose}>
                    &times;
                </span>
                <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
                {pokemon.sprites?.front_default ? (
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                ) : (
                    <p>No image available</p>
                )}
                <div className='Type'>
                    <h3>Type(s):</h3>
                    {pokemon.types?.map((typeObj: any) => {
                    const backgroundColor  = getTypeColor(typeObj.type.name);
                    return (
                        <span key={typeObj.type.name} style={{ backgroundColor, padding: '5px', borderRadius: '5px' }}>
                            {capitalizeFirstLetter(typeObj.type.name)} 
                        </span>
                    );
                })}
                </div>
                <div className='Stats'>
                    <h3>Stats:</h3>
                    {pokemon.stats?.map((statObj: any) => (
                        <p key={statObj.stat.name}>
                            {statObj.stat.name}: {statObj.base_stat}
                        </p>
                    ))}
                </div>
                <div className='Abilities'>
                    <h3>Abilities:</h3>
                    {pokemon.abilities?.map((abilityObj: any) => {
                    const abilityName = abilityObj.ability.name;
                    return (
                        <div key={abilityName}>
                        <p className="Name">{capitalizeFirstLetter(abilityName)}</p>
                        </div>
                    );
                    })}
                </div>
                <div className="Navigation">
                    <button className="Arrow Left-Arrow" onClick={handlePrevious}>
                        &lt; 
                    </button>
                    <button className="Arrow Right-Arrow" onClick={handleNext}>
                        &gt; 
                    </button>
                </div>
            </div>
        </div>
    );
}


export default PokemonModal;
