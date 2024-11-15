const PokemonTypeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-rose-600',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  flying: 'bg-sky-400',
  psychic: 'bg-pink-400',
  bug: 'bg-lime-500',
  rock: 'bg-stone-500',
  ghost: 'bg-indigo-500',
  dragon: 'bg-blue-800',
  dark: 'bg-gray-800',
  steel: 'bg-zinc-400',
  fairy: 'bg-pink-300',
};

export default function TypeInfo({ name }: { name: string }) {
  return (
    <span
      className={`${PokemonTypeColors[name]} py-2 px-3 mx-2 my-3 text-slate-50 rounded uppercase`}
    >
      {name}
    </span>
  );
}
