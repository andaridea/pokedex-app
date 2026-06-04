export const TYPE_COLORS = {
  fire: "#FF6B35",
  water: "#4A90D9",
  grass: "#56A847",
  electric: "#F7D02C",
  psychic: "#F95587",
  ice: "#96D9D6",
  dragon: "#6F35FC",
  dark: "#705746",
  fairy: "#D685AD",
  normal: "#A8A878",
  fighting: "#C22E28",
  flying: "#A98FF3",
  poison: "#A33EA1",
  ground: "#E2BF65",
  rock: "#B6A136",
  bug: "#A6B91A",
  ghost: "#735797",
  steel: "#B7B7CE",
};

export const TYPE_TEXT_COLORS = {
  fire: "#fff",
  water: "#fff",
  grass: "#fff",
  electric: "#333",
  psychic: "#fff",
  ice: "#333",
  dragon: "#fff",
  dark: "#fff",
  fairy: "#fff",
  normal: "#fff",
  fighting: "#fff",
  flying: "#fff",
  poison: "#fff",
  ground: "#333",
  rock: "#fff",
  bug: "#fff",
  ghost: "#fff",
  steel: "#fff",
};

export const STAT_COLORS = {
  hp: "#FF5959",
  attack: "#F5AC78",
  defense: "#FAE078",
  "special-attack": "#9DB7F5",
  "special-defense": "#A7DB8D",
  speed: "#FA92B2",
};

export function getTypeColor(type) {
  return TYPE_COLORS[type] ?? "#888";
}

export function getTypeTextColor(type) {
  return TYPE_TEXT_COLORS[type] ?? "#fff";
}

export function getStatColor(statName) {
  return STAT_COLORS[statName] ?? "#aaa";
}

export function formatStatName(name) {
  const map = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SP.ATK",
    "special-defense": "SP.DEF",
    speed: "SPD",
  };
  return map[name] ?? name;
}

export function padId(id) {
  return String(id).padStart(3, "0");
}

export function formatName(name) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
