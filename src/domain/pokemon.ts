import { Nullable } from './helperTypes';

export interface DataID {
  name: string;
  url: string;
}

export interface PokemonInfo {
  abilities: PokemonAbility[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: DataID[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMove[];
  name: string;
  order: string;
  species: DataID;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
}

interface PokemonSprites {
  back_default: Nullable<string>;
  back_female: Nullable<string>;
  back_shiny: Nullable<string>;
  back_shiny_female: Nullable<string>;
  front_default: Nullable<string>;
  front_female: Nullable<string>;
  front_shiny: Nullable<string>;
  front_shiny_female: Nullable<string>;
}

export interface PokemonType {
  slot: number;
  type: DataID;
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: DataID;
}

interface PokemonMove {
  move: DataID;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: DataID;
    version_group: DataID;
  };
}

interface GameIndex {
  game_index: number;
  version: DataID;
}

interface PokemonAbility {
  ability: DataID;
  is_hidden: false;
  slot: number;
}

interface HeldItem {
  item: DataID;
  version_details: {
    rarity: number;
    version: DataID;
  };
}
