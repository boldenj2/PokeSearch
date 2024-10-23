import axios from 'axios';

export const getPokemonByNameOrID = async (idOrName: string | number) => {

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};

export const getPokemonByType = async (type: string | number) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    const pokemonData = response.data.pokemon;

    // Map to return an array of Pokémon with name and id
    const pokemonList = await Promise.all(
        pokemonData.map(async (p: any) => {
            const fullPokemon = await getPokemonByNameOrID(p.pokemon.name);
            return fullPokemon; 
        })
    );
    return pokemonList;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
}

export const getAllPokemon = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20000');

    // Map to return an array of Pokémon with name and id
    const pokemonList = await Promise.all(
        response.data.results.map(async (p: any) => {
            const pokemon = await getPokemonByNameOrID(p.name);
            return pokemon;
        })
    );
    return pokemonList;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};

export const getAbilityByNameOrID = async (idOrName: string | number) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/ability/${idOrName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ability data:', error);
    throw error;
  }
}

