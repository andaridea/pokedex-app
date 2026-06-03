import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

const transformPokemon = (raw) => {
  return {
    id: raw.id,
    name: raw.name,
    types: raw?.types?.map((t) => t.type.name),
    sprite: raw.sprites.front_default,
    spriteOfficial:
      raw.sprites.other["official-artwork"].front_default ??
      raw.sprites.front_default,
    stats: raw.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    height: raw.height / 10,
    weight: raw.weight / 10,
    abilities: raw.abilities.map((a) => a.ability.name),
    baseExperience: raw.base_experience,
  };
};

async function fetchPokemon() {
  const response = await axios.get(`${BASE_URL}/pokemon?limit=300&offset=0`);

  return response.data;
}

async function fetchPokemonDetail(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch detail: ${res.status}`);
  const raw = await res.json();
  return transformPokemon(raw);
}

async function fetchAllPokemon() {
  const list = await fetchPokemon();
  const results = await Promise.all(list.results.map((p) => fetchPokemonDetail(p.url)));
  console.log(results, "res")
  return results;
}


export const pokemonService = {
  fetchPokemon,
  fetchAllPokemon,
  fetchPokemonDetail,
};
