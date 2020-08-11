import './sass/main.scss';
import RandomPokemon from './app/RandomPokemon';

const button = document.querySelector('.pokemonRandom__randomButton');
const randomPokemon = new RandomPokemon();

button.addEventListener('click', () => {
  button.disabled = true;
  randomPokemon.randomPokemon();
});
