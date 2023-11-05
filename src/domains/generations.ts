class Generation {
  regionName: string;
  order: number;
  totalPokemons: number;
  previousPokemons: number;

  constructor(
    regionName: string,
    order: number,
    totalPokemons: number,
    previousPokemons: number,
  ) {
    this.regionName = regionName;
    this.order = order;
    this.totalPokemons = totalPokemons;
    this.previousPokemons = previousPokemons;
  }
}

export const generations = [
  new Generation('Kanto', 1, 151, 0),
  new Generation('Johto', 2, 100, 151),
  new Generation('Hoen', 3, 135, 251),
  new Generation('Sinnoh', 4, 107, 386),
  new Generation('Unova', 5, 156, 493),
  new Generation('Kalos', 6, 72, 649),
  new Generation('Alola', 7, 88, 721),
  new Generation('Galar', 8, 96, 809),
  new Generation('Paldea', 9, 116, 905),
];

export const getGenerationData = (order: number) => generations[order - 1];
