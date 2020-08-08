import './sass/main.scss';
import { gsap } from 'gsap';

const button = document.querySelector('.pokemonRandom__randomButton');
let open = false;

function fallPokeball() {
  let tl = gsap.timeline();
  tl.to('.pokemonRandom__randomButton', { scale: 1.2, duration: 0.5 })
    .to('.pokemonRandom__randomButton', { scale: 0, duration: 1 })
    .to('.pokemonRandom__pokeball', {
      scale: 0.5,
      y: '25vh',
      ease: 'bounce.out',
      duration: 2,
    })
    .to('.pokemonRandom__pokeball', { rotate: 60, duration: 0.6 })
    .to('.pokemonRandom__pokeball', { rotate: -60, duration: 0.6 })
    .to('.pokemonRandom__pokeball', { rotate: 40, duration: 0.4 })
    .to('.pokemonRandom__pokeball', { rotate: -40, duration: 0.4 })
    .to('.pokemonRandom__pokeball', { rotate: 20, duration: 0.2 })
    .to('.pokemonRandom__pokeball', { rotate: -20, duration: 0.2 })
    .to('.pokemonRandom__pokeball', { rotate: 10, duration: 0.1 })
    .to('.pokemonRandom__pokeball', { rotate: -10, duration: 0.1 })
    .to('.pokemonRandom__pokeball', { rotate: 5, duration: 0.05 })
    .to('.pokemonRandom__pokeball', { rotate: -5, duration: 0.05 })
    .to('.pokemonRandom__pokeball', { rotate: 0, duration: 0.1 })
    .to('.pokemonRandom__pokeball', { scale: 0, duration: 0.5 });

  const fallId = setInterval(() => {
    if (!tl.isActive()) {
      open = true;
      clearInterval(fallId);
    }
  }, 100);
}

function speakName(name) {
  const msg = new SpeechSynthesisUtterance(`Wybieram Cię ${name}`);
  const voices = window.speechSynthesis.getVoices();
  window.speechSynthesis.speak(msg);
}

function showPokemon() {
  gsap.to('.pokemonContainer__pokemon', { scale: 1, duration: 1 });
}

function showName() {
  gsap.to('.pokemonContainer__name', { scale: 1, duration: 1 });
}

function animateArrow() {
  const arrow = document.querySelector('.pokemonRandom__showDirection');
  arrow.style.cssText =
    'animation-name: moveDown; animation-duration: 2s; animation-iteration-count: infinite;';
}

function addPokemon(srcImg, name) {
  const main = document.querySelector('.pokemonRandom');
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const img = document.createElement('img');
  const h1 = document.createElement('h1');

  div.classList.add('pokemonContainer');
  img.src = srcImg;

  img.classList.add('pokemonContainer__pokemon');
  h1.classList.add('pokemonContainer__name');

  img.style.cssText = 'transform: scale(0)';
  h1.style.cssText = 'transform: scale(0);';

  h1.textContent = name;

  div.appendChild(h1);
  div.appendChild(img);

  fragment.appendChild(div);

  main.appendChild(fragment);
  main.innerHTML +=
    '      <i class="fas fa-arrow-circle-down pokemonRandom__showDirection"></i>';

  showName();
  showPokemon();
  speakName(name);
  animateArrow();
}

function randomPokemon() {
  button.disabled = true;
  fallPokeball();
  const randomId = Math.floor(Math.random() * 807);

  fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
    .then((res) => res.json())
    .then((res) => {
      const srcImg = res.sprites.front_default;
      const name = res.name;

      const intervalId = setInterval(() => {
        if (open) {
          addPokemon(srcImg, name);
          clearInterval(intervalId);
        }
      }, 100);
    });
}

button.addEventListener('click', randomPokemon);
