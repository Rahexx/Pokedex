class Evolution {
  constructor() {
    this.speciesLink = '';
    this.evolutionChainLink = '';
    this.evolutions = [];
  }

  getSpeciesLink() {
    return this.speciesLink;
  }

  setSpeciesLink(link) {
    this.speciesLink = link;
  }

  getEvolutionChainLink() {
    return this.evolutionChainLink;
  }

  setEvolutionChainLink(link) {
    this.evolutionChainLink = link;
  }

  getEvolution() {
    return this.evolutions;
  }

  pushEvolution(evolution) {
    this.evolutions.push(evolution);
  }

  findEvolution(evolvesJson) {
    for (let i = 0; i < evolvesJson.length; i++) {
      this.pushEvolution(evolvesJson[i].species.name);
      if (evolvesJson[i].evolves_to.length) {
        this.findEvolution(evolvesJson[i].evolves_to);
      }
    }
  }

  downloadEvolutions() {
    fetch(`${this.getEvolutionChainLink()}`)
      .then((res) => res.json())
      .then((res) => {
        this.pushEvolution(res.chain.species.name);

        if (res.chain.evolves_to.length) {
          this.findEvolution(res.chain.evolves_to);
        }
      });
  }

  downloadEvolutionsChain() {
    fetch(`${this.getSpeciesLink()}`)
      .then((res) => res.json())
      .then((res) => {
        this.setEvolutionChainLink(res.evolution_chain.url);
        this.downloadEvolutions();
      });
  }
}

export default Evolution;
