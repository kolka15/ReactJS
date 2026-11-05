import { createPortal } from 'react-dom'

import { useTheme } from '../theme/useTheme.ts'

import styles from './ConfirmDialog.module.css'

export interface ConfirmDialogOptions {
  title: string
  description?: string
}

export interface ConfirmDialogProps {
  options: ConfirmDialogOptions | null
  onConfirm: () => void
  onCancel: () => void
}

const CONFIRM_DIALOG_ROOT_ID = 'confirm-dialog-root'

const getDialogRoot = (): HTMLElement =>
  document.getElementById(CONFIRM_DIALOG_ROOT_ID) ?? document.body

export const ConfirmDialog = ({ options, onConfirm, onCancel }: ConfirmDialogProps) => {
  const { theme } = useTheme()

  if (options === null) {
    return null
  }

  return createPortal(
    <div
      className={styles.overlay}
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCancel()
        }
      }}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={options.title}
        data-theme={theme}
      >
        <h2 className={styles.title}>{options.title}</h2>
        {options.description && <p className={styles.description}>{options.description}</p>}
        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onCancel}>
            Отмена
          </button>
          <button type="button" className={styles.confirm} onClick={onConfirm}>
            Подтвердить
          </button>
        </div>
      </div>
    </div>,
    getDialogRoot(),
  )
}
