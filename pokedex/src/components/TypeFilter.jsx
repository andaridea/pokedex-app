import { getTypeColor, formatName } from '../utils/PokemonUtils'
import styles from '../TypeFilter.module.css'

export function TypeFilter({ allTypes, activeTypes, onToggle, onClear }) {
  return (
    <div className={styles.wrap} role="group" aria-label="Filter by type">
      <button
        className={`${styles.btn} ${activeTypes.size === 0 ? styles.allActive : ''}`}
        onClick={onClear}
      >
        All
      </button>
      {allTypes.map((type) => {
        const isActive = activeTypes.has(type)
        const color = getTypeColor(type)
        return (
          <button
            key={type}
            className={`${styles.btn} ${isActive ? styles.active : ''}`}
            style={isActive ? { backgroundColor: color, borderColor: color, color: '#fff' } : { borderColor: color, color: color }}
            onClick={() => onToggle(type)}
            aria-pressed={isActive}
          >
            {formatName(type)}
          </button>
        )
      })}
    </div>
  )
}
