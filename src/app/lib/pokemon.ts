import { PokemonInfo } from '@/domain/pokemon';
import pokemonApi from './pokemonApi';

export const fetchPokemons = async () => {
  const listOfNames = await pokemonApi.getPokemonNames();
  const promises = listOfNames.map((info) =>
    pokemonApi.getPokemonDataByUrl(info.url),
  );

  return await Promise.all(promises).then((value) => value);
};
