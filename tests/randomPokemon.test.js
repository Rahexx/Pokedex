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
