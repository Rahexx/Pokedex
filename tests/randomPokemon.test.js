const RandomPokemon = require('../src/app/RandomPokemon');

const randomPokemon = new RandomPokemon();

test('createImagePokemon function exists', () => {
  expect(typeof randomPokemon.createImagePokemon).toEqual('function');
});

test('createImagePokemon returns', () => {
  expect(randomPokemon.createImagePokemon).toBeDefined();
});

test('createImagePokemon returns object', () => {
  expect(typeof randomPokemon.createImagePokemon()).toEqual('object');
});

test('createImagePokemon function exists', () => {
  expect(typeof randomPokemon.createImagePokemon).toEqual('function');
});

test('createImagePokemon returns', () => {
  expect(randomPokemon.createImagePokemon).toBeDefined();
});

test('createImagePokemon returns object', () => {
  expect(typeof randomPokemon.createImagePokemon()).toEqual('object');
});

test('pushTypes returns', () => {
  expect(randomPokemon.pushType).toBeDefined();
});

test('pushTypes is throw Error ', () => {
  expect(randomPokemon.pushTypes).toBeUndefined();
});

test('pushTypes is push types element ', () => {
  const types = [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
    {
      slot: 2,
      type: {
        name: 'poison',
        url: 'https://pokeapi.co/api/v2/type/4/',
      },
    },
  ];
  randomPokemon.pushType(types);
  expect(randomPokemon.getTypes()).toContain('grass');
  expect(randomPokemon.getTypes()).toContain('poison');
});

test('pushAbilities is throw Error ', () => {
  expect(randomPokemon.pushAbilities).toThrow(Error);
});

test('pushAbilities is push types element ', () => {
  const abilities = [
    {
      ability: {
        name: 'overgrow',
        url: 'https://pokeapi.co/api/v2/ability/65/',
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: 'chlorophyll',
        url: 'https://pokeapi.co/api/v2/ability/34/',
      },
      is_hidden: true,
      slot: 3,
    },
  ];
  randomPokemon.pushAbilities(abilities);
  expect(randomPokemon.getAbilities()).toContain('overgrow');
  expect(randomPokemon.getAbilities()).toContain('chlorophyll');
});
