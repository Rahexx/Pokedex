'use server';
import pokemonApi from './pokemonApi';

export const fetchPokemons = async () => {
  const listOfNames = await pokemonApi.getPokemonNames();
  const names = listOfNames.map((pokemon) => pokemon.name);
  const pokemonsData = await pokemonApi.getPokemonsData(names);
  return pokemonsData;
};

export const addToFavorite = async (pokemonName: string, type: string) => {
  try {
    await fetch('http://localhost:3000/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, name: pokemonName }),
    });

    return true;
  } catch (err) {
    console.log('error', err);
    return false;
  }
};

export const deleteFromFavorite = async (pokemonName: string) => {
  try {
    await fetch('http://localhost:3000/api', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: pokemonName }),
    });

    return false;
  } catch (err) {
    console.log('error', err);
    return true;
  }
};

export const updatePokemonType = async (id: string) => {
  try {
    await fetch('http://localhost:3000/api', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  } catch (err) {
    console.log('put error', err);
  }
};

export const getPokemonDetails = async (name: string) => {
  try {
    const res = await pokemonApi.getPokemonInfo(name);
    return res;
  } catch (err) {
    console.log(`Fetching ${name} info failed`, err);
  }
};
