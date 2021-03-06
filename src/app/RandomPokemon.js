/* eslint-disable class-methods-use-this */
import { gsap } from 'gsap';
import Evolution from './Evolution';

class RandomPokemon extends Evolution {
  constructor() {
    super();
    this.name = '';
    this.sourceImagePokemon = '';
    this.isAnimationEnd = false;
    this.types = [];
    this.abilities = [];

    window.addEventListener('resize', () => {
      this.setBodyGridTemplate();
    });
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

  getTypes() {
    return this.types;
  }

  getAbilities() {
    return this.abilities;
  }

  pushAbilities(ability) {
    for (let i = 0; i < ability.length; i++) {
      this.abilities.push(ability[i].ability.name);
    }
  }

  pushType(types) {
    for (let i = 0; i < types.length; i++) {
      this.types.push(types[i].type.name);
    }
  }

  animateArrow() {
    const arrow = document.querySelector('.showDirection');
    arrow.style.cssText = 'animation-name: moveDown; animation-duration: 2s; animation-iteration-count: infinite;';
  }

  speakName() {
    const msg = new SpeechSynthesisUtterance(`Wybieram Cię ${this.getName()}`);
    window.speechSynthesis.speak(msg);
  }

  showPokemon() {
    gsap.to('.pokemonContainer__pokemon', { scale: 1, duration: 1 });
  }

  showName() {
    gsap.to('.pokemonContainer__name', { scale: 1, duration: 1 });
  }

  createImagePokemon() {
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

  createEventArrow(goTo, itemNumber) {
    const arrows = document.querySelectorAll('.showDirection');

    arrows[itemNumber].addEventListener('click', () => {
      const information = document.querySelector(goTo);
      information.scrollIntoView({ behavior: 'smooth' });
    });
  }

  setBodyGridTemplate() {
    const width = document.body.offsetWidth;

    switch (width) {
      case width >= 1024:
        document.body.style.gridTemplate = '50vh 1fr / 50% 50%';
        document.querySelector('.imgContainer').style.gridColumn = '1 / 3';
        break;
      case width === 768:
        document.body.style.gridTemplate = '30vh 60vh 100vh / 100vw';
        break;
      case width >= 550:
        document.body.style.gridTemplate = '30vh 70vh 100vh / 88vw';
        break;
      default:
        document.body.style.gridTemplate = '30vh 60vh 10vh 90vh / 100vw';
    }
  }

  removeElements(...elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].remove();
    }
  }

  emptyArray(...arrays) {
    for (let i = 0; i < arrays.length; i++) {
      arrays[i] = [];
    }
  }

  refreshPage() {
    const informationHolder = document.querySelector('.informationHolder');
    const showDirection = document.querySelector('.showDirection');
    const pokemonContainer = document.querySelector('.pokemonContainer');
    const button = document.querySelector('.pokemonRandom__randomButton');
    const pokeball = document.querySelector('.pokemonRandom__pokeball');

    button.disabled = false;
    button.style.transform = 'scale(1) translate(-50%, -50%) ';
    pokeball.style.top = '0';
    pokeball.style.transform = 'translate(-50%, -50%) scale(0)';

    this.removeElements(informationHolder, showDirection, pokemonContainer);
    this.emptyArray(this.types, this.abilities, this.evolutions);

    this.sourceImagePokemon = '';
    this.isAnimationEnd = false;

    window.scroll(0, 0);
    if (document.body.offsetWidth >= 1024) {
      document.body.style.gridTemplate = '50vh 1fr / 100%';
      document.body.style.height = '100vh';
    }

    button.addEventListener('click', () => {
      this.randomPokemon();
    });
  }

  addRefreshEvent() {
    const refresh = document.querySelector('.refresh');

    refresh.addEventListener('click', () => {
      this.refreshPage();
    });
  }

  addToLocalStorage() {
    if (!Number(localStorage.getItem('counter') >= 6)) {
      const icon = document.querySelector('.add');
      const counter = Number(localStorage.getItem('counter'));

      localStorage.setItem(
        this.getName(),
        `${Number(localStorage.getItem('counter')) + 1} pokemon`,
      );
      localStorage.removeItem('counter');
      localStorage.setItem('counter', counter + 1);

      icon.classList.remove('fa-plus');
      icon.classList.add('fa-check');
    }
  }

  checkPropertyCounterExist() {
    if (!localStorage.hasOwnProperty('counter')) {
      localStorage.setItem('counter', 0);
    }
  }

  addClassesToElement(element, classes) {
    element.classList.add(classes);
  }

  addInformation() {
    document.body.style.height = '190vh';
    this.setBodyGridTemplate();

    const div = document.createElement('div');
    const arrow = document.createElement('i');
    const refresh = document.createElement('i');
    const addToTeam = document.createElement('i');
    const arrowClasses = ['fas', 'fa-arrow-circle-up', 'showDirection'];
    const refreshClasses = ['fas', 'fa-sync-alt', 'refresh'];
    const addClasses = ['fas', 'add'];

    this.checkPropertyCounterExist();

    if (Number(localStorage.getItem('counter')) === 6) {
      addClasses.push('fa-times');
    } else if (localStorage.hasOwnProperty(this.getName())) {
      addClasses.push('fa-check');
    } else {
      addClasses.push('fa-plus');
    }

    this.addClassesToElement(arrow, ...arrowClasses);
    this.addClassesToElement(refresh, ...refreshClasses);
    this.addClassesToElement(addToTeam, ...addClasses);

    arrow.style.cssText = 'animation-name: moveUp; animation-duration: 2s; animation-iteration-count: infinite; bottom: 2vh;';

    div.classList.add('informationHolder');

    for (let i = 0; i < 3; i++) {
      const paragraph = document.createElement('p');
      const headings = document.createElement('h2');
      const itemDiv = document.createElement('div');

      headings.classList.add('informationHolder__headings');
      itemDiv.classList.add('informationHolder__item');

      switch (i) {
        case 0:
          for (let j = 0; j < this.getTypes().length; j++) {
            const span = document.createElement('span');
            span.classList.add(this.getTypes()[j]);

            if (j === this.getTypes().length - 1) {
              span.textContent = `${this.getTypes()[j]}`;
            } else {
              span.textContent = `${this.getTypes()[j]} - `;
            }
            paragraph.appendChild(span);
          }
          paragraph.classList.add('informationHolder__types');
          headings.textContent = 'Typ:';
          break;
        case 1:
          paragraph.textContent = this.getAbilities().join(' - ');
          paragraph.classList.add('informationHolder__abilities');
          headings.textContent = 'Umiejętności:';
          break;
        case 2:
          paragraph.textContent = super.getEvolution().join(' - ');
          paragraph.classList.add('informationHolder__evolution');
          headings.textContent = 'Ewolucje:';
          break;
        default:
          paragraph.textContent = 'Brak informacji';
          headings.textContent = '';
      }

      itemDiv.appendChild(headings);
      itemDiv.appendChild(paragraph);
      div.appendChild(itemDiv);
    }

    div.appendChild(arrow);
    div.appendChild(refresh);
    div.appendChild(addToTeam);

    document.body.appendChild(div);

    this.createEventArrow('.informationHolder', 0);
    this.createEventArrow('.imgContainer', 1);
    this.addRefreshEvent();

    document.querySelector('.add').addEventListener('click', () => {
      this.addToLocalStorage();
    });

    if (document.body.offsetWidth >= 1024) {
      gsap.to('.informationHolder__item', { scale: 1, duration: 1 });
    }
  }

  addPokemon() {
    const main = document.querySelector('.pokemonRandom');
    const div = document.createElement('div');

    div.classList.add('pokemonContainer');

    div.appendChild(this.createNamePokemon());
    div.appendChild(this.createImagePokemon());

    main.appendChild(div);
    main.innerHTML += '<i class="fas fa-arrow-circle-down showDirection"></i>';

    this.showName();
    this.showPokemon();
    this.speakName();
    this.animateArrow();
    this.addInformation();
  }

  fallPokeball() {
    const main = document.querySelector('.pokemonRandom');
    const mainWidth = main.offsetWidth;

    const jumpHeight = mainWidth > 500 && mainWidth < 1024 && mainWidth !== 768 ? '75%' : '25vh';

    const tl = gsap.timeline();

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
        this.pushType(res.types);
        this.pushAbilities(res.abilities);
        super.setSpeciesLink(res.species.url);
        super.downloadEvolutionsChain();

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
// module.exports = RandomPokemon;
