import Image from 'next/image';
import { getPokemonDetails } from '../lib/pokemon';
import TypeInfo from '../componentes/TypeInfo/TypeInfo';

interface PokemonDetailsPageProps {
  params: { name: string };
}

export default async function PokemonDetailsPage({
  params,
}: PokemonDetailsPageProps) {
  const pokemonDetails = await getPokemonDetails(params.name);

  if (!pokemonDetails) return <h1>There is no data for {params.name}</h1>;

  return (
    <main className='mx-auto pt-12 flex justify-between max-w-screen-md	'>
      {pokemonDetails.sprites.front_default && (
        <Image
          src={pokemonDetails.sprites.front_default}
          alt={`Image from front of ${pokemonDetails.name}`}
          height={240}
          width={240}
        />
      )}
      <section>
        <header>
          <h1 className='flex justify-evenly flex-wrap'>
            {pokemonDetails.name}
          </h1>
          <div className='my-3'>
            {pokemonDetails.types.map((type) => (
              <TypeInfo key={type.type.name} name={type.type.name} />
            ))}
          </div>
        </header>
        <div>
          <p>Pokedex Number: {pokemonDetails.id}</p>
          <p>Height: {pokemonDetails.height}</p>
          <div>
            <h2>Abilities</h2>
            {pokemonDetails.abilities.map((ability) => (
              <p key={ability.slot}>{ability.ability.name}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
