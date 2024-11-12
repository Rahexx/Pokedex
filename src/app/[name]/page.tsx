import Image from 'next/image';
import { getPokemonDetails } from '../lib/pokemon';

interface PokemonDetailsPageProps {
  params: { name: string };
}

export default async function PokemonDetailsPage({
  params,
}: PokemonDetailsPageProps) {
  const pokemonDetails = await getPokemonDetails(params.name);

  if (!pokemonDetails) return <h1>There is no data for {params.name}</h1>;

  return (
    <main>
      {pokemonDetails.sprites.front_default && (
        <Image
          src={pokemonDetails.sprites.front_default}
          alt={`Image from front of ${pokemonDetails.name}`}
          height={360}
          width={360}
        />
      )}
      <section>
        <header>
          <h1>{pokemonDetails.name}</h1>
          {pokemonDetails.types.map((type) => type.type.name)}
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
