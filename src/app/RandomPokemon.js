import { gsap } from 'gsap';

class RandomPokemon {
  constructor() {
    this.name = '';
    this.sourceImagePokemon = '';
    this.isAnimationEnd = false;
  }

  getName() {
    return this.name;
  }

  setName(newName) {
    this.name = newName;
  }

  getSourceImagePokemon() {
    return this.sourceImagePokemon;
  }

  setSourceImagePokemon(newSource) {
    this.sourceImagePokemon = newSource;
  }

  getIsAnimationEnd() {
    return this.isAnimationEnd;
  }

  setAnimationEnd(isEnd) {
    this.isAnimationEnd = isEnd;
  }

  animateArrow() {
    const arrow = document.querySelector('.pokemonRandom__showDirection');
    arrow.style.cssText =
      'animation-name: moveDown; animation-duration: 2s; animation-iteration-count: infinite;';
  }

  speakName() {
    const msg = new SpeechSynthesisUtterance(`Wybieram Cię ${this.getName()}`);
    const voices = window.speechSynthesis.getVoices();
    window.speechSynthesis.speak(msg);
  }

  showPokemon() {
    gsap.to('.pokemonContainer__pokemon', { scale: 1, duration: 1 });
  }

  showName() {
    gsap.to('.pokemonContainer__name', { scale: 1, duration: 1 });
  }

  createImagePokemon(srcImg) {
    const img = document.createElement('img');

    img.src = this.getSourceImagePokemon();
    img.classList.add('pokemonContainer__pokemon');
    img.style.cssText = 'transform: scale(0)';

    return img;
  }

  createNamePokemon() {
    const h1 = document.createElement('h1');

    h1.classList.add('pokemonContainer__name');
    h1.style.cssText = 'transform: scale(0);';
    h1.textContent = this.getName();

    return h1;
  }

  addPokemon() {
    const main = document.querySelector('.pokemonRandom');
    const div = document.createElement('div');

    div.classList.add('pokemonContainer');

    div.appendChild(this.createNamePokemon());
    div.appendChild(this.createImagePokemon());

    main.appendChild(div);
    main.innerHTML +=
      '      <i class="fas fa-arrow-circle-down pokemonRandom__showDirection"></i>';

    this.showName();
    this.showPokemon();
    this.speakName();
    this.animateArrow();
  }

  fallPokeball() {
    const main = document.querySelector('.pokemonRandom');
    const mainWidth = main.offsetWidth;

    const jumpHeight =
      mainWidth > 500 && mainWidth < 1024 && mainWidth != 768 ? '75%' : '25vh';

    let tl = gsap.timeline();

    tl.to('.pokemonRandom__randomButton', { scale: 1.2, duration: 0.5 })
      .to('.pokemonRandom__randomButton', { scale: 0, duration: 1 })
      .to('.pokemonRandom__pokeball', {
        scale: 0.5,
        y: jumpHeight,
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
        this.isAnimationEnd = true;
        clearInterval(fallId);
      }
    }, 100);
  }

  randomPokemon() {
    this.fallPokeball();
    const randomId = Math.floor(Math.random() * 807);

    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then((res) => res.json())
      .then((res) => {
        this.setSourceImagePokemon(res.sprites.front_default);
        this.setName(res.name);

        const intervalId = setInterval(() => {
          if (this.isAnimationEnd) {
            this.addPokemon();
            clearInterval(intervalId);
          }
        }, 100);
      });
  }
}

export default RandomPokemon;
//module.exports = RandomPokemon;
