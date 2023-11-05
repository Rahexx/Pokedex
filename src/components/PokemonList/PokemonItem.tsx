import Image from 'next/image';

export default function PokemonItem(){
    return(
        <li>
        <Image
          src=''
          width={200}
          height={200}
          alt={`Default back picture of pokemonName`}
        />
        <p>Pokemon Name</p>
      </li>
    )
}