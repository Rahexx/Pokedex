import Image from 'next/image';
import { fetchPokemons } from './lib/pokemon';

export default async function Home() {
  const listOfPokemons = await fetchPokemons();

  return (
    <main>
      <h1 className='inline-block text-center my-16'>Pokedex</h1>
      <div className='flex flex-wrap w-full'>
        {listOfPokemons.map((pokemon) => {
          if (pokemon === null) {
            return;
          }

          return (
            <div
              className='flex flex-col h-28	w-28 m-8 cursor-pointer'
              key={pokemon.id}
            >
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
