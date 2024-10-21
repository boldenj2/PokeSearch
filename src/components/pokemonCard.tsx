import React, {useEffect, useState} from 'react';
import './pokemonCard.css';
import { getPokemonByNameOrID, getPokemonByType} from '../api/pokemonService';

interface Pokemon {
  name: string;
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
}

const typeColors: { [key: string]: string } = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040B0',
  ground: '#E0C068',
  flying: '#A98FF3',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#F0B6BC',
};

function PokemonCard({idOrName}: {idOrName: string | number}) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    getPokemonByNameOrID(idOrName)
      .then((data) => setPokemon(data))
      .catch((error) => console.error('Error fetching Pokémon data:', error));
  }, [idOrName]);

  return (
    <div className='Pokemon-Card'>
      {pokemon ? (
        <div>
          <h2>{pokemon.name}</h2>
          
          {/* Display Pokémon Image */}
          {pokemon.sprites?.front_default ? (
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          ) : (
            <p>No image available</p>
          )}

          {/* Display Pokémon Types */}
          <div className='Type'>
            <h3>Type(s):</h3>
            {pokemon.types?.map((typeObj: any) => (
              <span key={typeObj.type.name}>{typeObj.type.name} </span>
            ))}
          </div>

          {/* Display Pokémon Stats */}
          <div className='Stats'>
            <h3>Stats:</h3>
            {pokemon.stats?.map((statObj: any) => (
              <p key={statObj.stat.name}>
                {statObj.stat.name}: {statObj.base_stat}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <p>Enter a Pokémon name or ID to see details</p>
      )}
    </div>
  );
}

export default PokemonCard;
