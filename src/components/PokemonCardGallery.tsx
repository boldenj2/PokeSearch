import React, {useEffect, useState} from "react";
import { getPokemonByNameOrID} from '../api/pokemonService';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  id : number;
}

const capitalizeFirstLetter = (string: string) => {
    if (!string) return ''; // Handle empty strings
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

function PokemonCardGallery({idOrName}: {idOrName: string | number}) {
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
                    <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
                    {pokemon.sprites?.front_default ? (
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    ) : (
                        <p>No image available</p>
                    )}
                    <p>#{pokemon.id}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default PokemonCardGallery;
