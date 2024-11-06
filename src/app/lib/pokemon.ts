'use server';
import pokemonApi from './pokemonApi';
import { revalidateTag } from 'next/cache';

export const fetchPokemons = async () => {
  const listOfNames = await pokemonApi.getPokemonNames();
  const names = listOfNames.map((pokemon) => pokemon.name);
  const pokemonsData = await pokemonApi.getPokemonsData(names);
  return pokemonsData;
};

export const addToFavorite = async (pokemonName: string) => {
  try {
    await fetch('http://localhost:3000/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: pokemonName }),
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
