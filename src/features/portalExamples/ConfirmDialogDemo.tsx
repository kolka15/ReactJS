import { useState } from 'react'

import { ConfirmDialog } from 'shared/ui/ConfirmDialog/ConfirmDialog.tsx'
import { useConfirmDialog } from 'shared/ui/ConfirmDialog/useConfirmDialog.ts'

import styles from './ConfirmDialogDemo.module.css'

const INITIAL_ITEMS = ['Черновик отчёта', 'Старые логи', 'Тестовые данные']

export const ConfirmDialogDemo = () => {
  const { showConfirmDialog, dialogProps } = useConfirmDialog()
  const [items, setItems] = useState(INITIAL_ITEMS)

  const handleDelete = async (item: string) => {
    const confirmed = await showConfirmDialog({
      title: `Удалить «${item}»?`,
      description: 'Это действие необратимо.',
    })

    if (confirmed) {
      setItems((prev) => prev.filter((current) => current !== item))
    }
  }

  return (
    <section>
      <h2>ConfirmDialog через портал</h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            <span>{item}</span>
            <button type="button" className={styles.deleteButton} onClick={() => handleDelete(item)}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
      {items.length === 0 && <p className={styles.empty}>Всё удалено.</p>}
      <ConfirmDialog {...dialogProps} />
    </section>
  )
}
