import { getGenerationData } from '@/domains/generations';

export async function getAllPokemons(order: number) {
  const { totalPokemons, previousPokemons } = getGenerationData(order);

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${totalPokemons}&offset=${previousPokemons}`,
  );

  if (!res.ok) throw new Error('Failed to fetch pokemon list data');

  return res.json();
}
