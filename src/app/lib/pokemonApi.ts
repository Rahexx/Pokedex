import { DataID, PokemonInfo } from '@/domain/pokemon';
import { cookies } from 'next/headers';

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
  getPokemonNames: async (): Promise<DataID[]> => {
    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=2000',
        {
          next: { tags: ['pokemonNames'] },
        },
      );
      const data = (await response.json()) as GetPokemonNamesRes;
      return data.results;
    } catch (err) {
      console.error('Problem with fetching pokemon names', err);
      return [];
    }
  },

  getPokemonsData: async (names: string[]) => {
    const results = [];

    for (let i = 0; i < names.length; i += 300) {
      const batch = names.slice(i, i + 300);
      const promises = batch.map((name) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
          next: { tags: ['pokemonNames'] },
        }).then((res) => res.json() as Promise<PokemonInfo>),
      );

      try {
        const batchResults = await Promise.all(promises);
        results.push(...batchResults);
      } catch (error) {
        console.error('Error fetching batch:', error);
      }
    }

    return results;
  },

  getPokemonInfo: async (name: string) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      next: { tags: ['pokemonInfo'] },
    }).then((res) => res.json() as Promise<PokemonInfo>),

  getFavorite: async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    const res = await fetch('http://localhost:3000/api', {
      next: { tags: ['favoriteList'] },
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token?.value || ''}`,
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  },
};

export default pokemonApi;
