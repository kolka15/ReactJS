import { useState } from 'react'

import { ConfirmDialog } from 'shared/ui/ConfirmDialog/ConfirmDialog.tsx'
import { useConfirmDialog } from 'shared/ui/ConfirmDialog/useConfirmDialog.ts'
import { Tooltip } from 'shared/ui/Tooltip/Tooltip.tsx'
import { TooltipPosition } from 'shared/ui/Tooltip/TooltipPosition.ts'
import { ThemeProvider } from 'shared/ui/theme/ThemeContext.tsx'
import { useTheme } from 'shared/ui/theme/useTheme.ts'

import styles from './PortalShowcase.module.css'

const ShowcaseBody = () => {
  const { theme, toggleTheme } = useTheme()
  const { showConfirmDialog, dialogProps } = useConfirmDialog()
  const [confirmed, setConfirmed] = useState<boolean | null>(null)

  const handleDelete = async () => {
    const result = await showConfirmDialog({
      title: 'Удалить элемент?',
      description: 'Это действие необратимо.',
    })
    setConfirmed(result)
  }

  return (
    <>
      <div className={styles.controls}>
        <button type="button" onClick={toggleTheme}>
          Тема: {theme === 'light' ? 'светлая' : 'тёмная'}
        </button>
        <Tooltip content="Тема из контекста" position={TooltipPosition.Top}>
          <button type="button">Наведи на меня</button>
        </Tooltip>
        <button type="button" className={styles.deleteButton} onClick={() => handleDelete()}>
          Удалить
        </button>
        {confirmed !== null && (
          <span className={styles.result}>{confirmed ? 'Подтверждено' : 'Отменено'}</span>
        )}
      </div>
      <ConfirmDialog {...dialogProps} />
    </>
  )
}

export const PortalShowcase = () => (
  <section>
    <h2>Использование React Context внутри портала </h2>
    <ThemeProvider>
      <ShowcaseBody />
    </ThemeProvider>
  </section>
)
