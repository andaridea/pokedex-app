import { getTypeColor, getTypeTextColor, formatName } from '../utils/PokemonUtils'
import styles from '../TypeBadge.module.css'

export function TypeBadge({ type, size }) {
  return (
    <span
      className={`${styles.badge} ${styles[size]}`}
      style={{
        backgroundColor: getTypeColor(type),
        color: getTypeTextColor(type),
      }}
    >
      {formatName(type)}
    </span>
  )
}
