import Image from 'next/image';
import { fetchPokemons } from './lib/pokemon';
import Favorite from './componentes/Favorite/Favorite';
import pokemonApi from './lib/pokemonApi';

export default async function Home() {
  const data = await pokemonApi.getFavorite();
  const favoritePokemons = data.data.map(
    (data: { id: string; name: string }) => data.name,
  );

  const listOfPokemons = await fetchPokemons();

  return (
    <main>
      <h1 className='inline-block text-center my-16 w-full text-2xl'>
        Pokedex
      </h1>
      <div className='flex flex-wrap w-full'>
        {listOfPokemons.map((pokemon) => {
          if (pokemon === null) {
            return;
          }

          return (
            <div
              className='relative flex flex-col h-28	w-28 m-8 cursor-pointer'
              key={pokemon.id}
            >
              <Favorite
                name={pokemon.name}
                isFavorite={favoritePokemons.includes(pokemon.name)}
              />
              {pokemon.sprites.front_default && (
                <Image
                  src={pokemon.sprites.front_default}
                  alt={`Image from front of ${pokemon.name}`}
                  height={120}
                  width={120}
                />
              )}
              <p className='text-center capitalize'>{pokemon.name}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
