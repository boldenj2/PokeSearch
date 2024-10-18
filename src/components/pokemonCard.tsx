import React, {useEffect, useState} from 'react';
import './pokemonCard.css';
import { getPokemon } from '../api/pokemonService';

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

function PokemonCard({idOrName}: {idOrName: string | number}) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    getPokemon(idOrName)
      .then((data) => setPokemon(data))
      .catch((error) => console.error('Error fetching Pokémon data:', error));
  }, [idOrName]);

  return (
    <div>
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
          <div>
            <h3>Type(s):</h3>
            {pokemon.types?.map((typeObj: any) => (
              <span key={typeObj.type.name}>{typeObj.type.name} </span>
            ))}
          </div>

          {/* Display Pokémon Stats */}
          <div>
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
