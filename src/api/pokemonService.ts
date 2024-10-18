import axios from 'axios';

export const getPokemon = async (idOrName: string | number) => {

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};
