import { DataID, PokemonInfo } from '@/domain/pokemon';

interface BaseRes {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface GetPokemonNamesRes extends BaseRes {
  results: DataID[];
}

export interface GetPokemonDataByUrlRes extends BaseRes {
  results: PokemonInfo;
}

const pokemonApi = {
  getPokemonNames: (): Promise<DataID[]> =>
    fetch('https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0')
      .then((res) => res.json() as unknown as Promise<GetPokemonNamesRes>)
      .then((res) => res.results)
      .catch((err) => {
        console.error('Problem with fetching pokemon names', err);
        return [];
      }),

  getPokemonDataByUrl: (url: string) =>
    fetch(url)
      .then((res) => res.json() as unknown as Promise<PokemonInfo>)
      .catch((err) => {
        console.error('Problem with fetching pokemons info', err);
        return null;
      }),
};

export default pokemonApi;
