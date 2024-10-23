import React, {useEffect, useState} from 'react';
import { getPokemonByNameOrID, getAbilityByNameOrID } from '../api/pokemonService';

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
  abilities: {
    ability: {
      name: string;
    };
  }[]; 
}

const capitalizeFirstLetter = (string: string) => {
  if (!string) return ''; // Handle empty strings
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function PokemonCard({idOrName}: {idOrName: string | number}) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [abilityDescriptions, setAbilityDescriptions] = useState<{ [key: string]: string }>({});


  useEffect(() => {
    getPokemonByNameOrID(idOrName)
      .then((data) => setPokemon(data))
      .catch((error) => console.error('Error fetching Pokémon data:', error));
  }, [idOrName]);

  useEffect(() => {
    if (pokemon && pokemon.abilities) {
      pokemon.abilities.forEach((abilityObj) => {
        const abilityName = abilityObj.ability.name;

        getAbilityByNameOrID(abilityName)
          .then((data) => {
            const englishEffect = data.effect_entries.find((entry: any) => entry.language.name === 'en');
            setAbilityDescriptions((prevDescriptions) => ({
              ...prevDescriptions,
              [abilityName]: englishEffect ? englishEffect.effect : 'No description available',
            }));
          })
          .catch((error) => console.error('Error fetching ability data:', error));
      });
    }
  }, [pokemon])

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

  return (
    <div className='Pokemon-Card'>
      {pokemon ? (
        <div>
          <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
          
          {/* Display Pokémon Image */}
          {pokemon.sprites?.front_default ? (
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          ) : (
            <p>No image available</p>
          )}

          {/* Display Pokémon Types */}
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

          {/* Display Pokémon Stats */}
          <div className='Stats'>
            <h3>Stats:</h3>
            {pokemon.stats?.map((statObj: any) => (
              <p key={statObj.stat.name}>
                {statObj.stat.name}: {statObj.base_stat}
              </p>
            ))}
          </div>

          {/* Display Pokémon Abilities */}
          <div className='Abilities'>
            <h3>Abilities:</h3>
            {pokemon.abilities?.map((abilityObj: any) => {
              const abilityName = abilityObj.ability.name;
              return (
                <div key={abilityName}>
                  <p className='Name'>{capitalizeFirstLetter(abilityName)}</p>
                  <p className='Description'>{abilityDescriptions[abilityName] || 'Loading description...'}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Enter a Pokémon name or ID to see details</p>
      )}
    </div>
  );
}

export default PokemonCard;
