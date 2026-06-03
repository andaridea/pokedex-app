import styles from "../Card.module.css";
import { formatName, padId, typeColor } from "../utils/PokemonUtils";
import { TypeBadge } from "./TypeBadge";
export function Card({ pokemon, onClick }) {
  const fallback = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  return (
    <>
      <button
        onClick={() => onClick(pokemon)}
        className={styles.card}
        style={{ "--type-color": typeColor(pokemon.types[0]) }}
      >
        <img
          src={pokemon.spriteOfficial || pokemon.sprite}
          alt={pokemon.name}
          className={styles.img}
          loading="lazy"
        />
        <div className={styles.textBox}>
          <p className={styles.head}>{formatName(pokemon.name)}</p>
          <span>#{padId(pokemon.id)}</span>
          <div>
            {pokemon?.types?.map((t) => (
              <TypeBadge key={t} type={t} size="sm" />
            ))}
          </div>
        </div>
      </button>
    </>
  );
}
