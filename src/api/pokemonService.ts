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
    const pokemonNames = pokemonData.map((p: any) => p.pokemon.name);
    return pokemonNames;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
}

export const getAllPokemon = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};

