import styles from './FilterButton.module.css'

export interface FilterButtonProps {
  label: string
  active: boolean
  onClick: () => void
}

export const FilterButton = ({ label, active, onClick }: FilterButtonProps) => (
  <button type="button" className={styles.button} aria-pressed={active} onClick={onClick}>
    {label}
  </button>
)
