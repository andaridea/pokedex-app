import { useEffect, useState } from "react";
import { TypeBadge } from "./TypeBadge";
import {
  padId,
  formatName,
  getStatColor,
  formatStatName,
  TYPE_COLORS
} from "../utils/PokemonUtils";
import styles from "../Modal.module.css";

const MAX_STAT = 255;

export function Modal({ pokemon, onClose }) {
  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.value, 0);
  const fallback = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  const sprites = [
    pokemon.spriteOfficial || pokemon.sprite,
    pokemon.sprite,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`,
  ]
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i); // dedupe

  const [activeSprite, setActiveSprite] = useState(sprites[0]);

  const primaryType = pokemon.types[0] ?? "normal";
  const typeColor = TYPE_COLORS[primaryType.toLowerCase()] ?? "#888";

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${formatName(pokemon.name)} details`}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.heroArea} style={{ "--type-color": typeColor }}>
          <div className={styles.header}>
            <div>
              <p className={styles.num}>#{padId(pokemon.id)}</p>
              <h2 className={styles.name}>{formatName(pokemon.name)}</h2>
              <div className={styles.types}>
                {pokemon.types.map((t) => (
                  <TypeBadge key={t} type={t} size="md" />
                ))}
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className={styles.imgWrap}>
            <img
              src={activeSprite}
              alt={pokemon.name}
              className={styles.img}
              onError={(e) => {
                e.currentTarget.src = fallback;
              }}
            />
          </div>

          <div className={styles.spriteGallery}>
            {sprites.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${pokemon.name} sprite ${i + 1}`}
                className={`${styles.spriteThumbnail} ${activeSprite === src ? styles.active : ""}`}
                onClick={() => setActiveSprite(src)}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ))}
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCell}>
              <span className={styles.infoLabel}>Height</span>
              <span className={styles.infoVal}>
                {pokemon.height.toFixed(1)} m
              </span>
            </div>
            <div className={styles.infoCell}>
              <span className={styles.infoLabel}>Weight</span>
              <span className={styles.infoVal}>
                {pokemon.weight.toFixed(1)} kg
              </span>
            </div>
            <div className={styles.infoCell}>
              <span className={styles.infoLabel}>Ability</span>
              <span className={styles.infoVal}>
                {formatName(pokemon.abilities[0] ?? "-")}
              </span>
            </div>
            <div className={styles.infoCell}>
              <span className={styles.infoLabel}>Base EXP</span>
              <span className={styles.infoVal}>
                {pokemon.baseExperience ?? "-"}
              </span>
            </div>
          </div>

          <div className={styles.statsHeader}>
            <span className={styles.sectionTitle}>Base Stats</span>
            <span className={styles.totalBadge}>Total: {totalStats}</span>
          </div>

          {pokemon.stats.map((stat) => (
            <div key={stat.name} className={styles.statRow}>
              <span className={styles.statLabel}>
                {formatStatName(stat.name)}
              </span>
              <div className={styles.barWrap}>
                <div
                  className={styles.bar}
                  style={{
                    width: `${Math.round((stat.value / MAX_STAT) * 100)}%`,
                    backgroundColor: getStatColor(stat.name),
                  }}
                />
              </div>
              <span className={styles.statVal}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
