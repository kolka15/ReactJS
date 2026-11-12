import { useRef, useState, type MouseEvent } from 'react'

import { Tooltip } from 'shared/ui/Tooltip/Tooltip.tsx'
import { TooltipPosition } from 'shared/ui/Tooltip/TooltipPosition.ts'

import styles from './TooltipEventsDemo.module.css'

const MAX_LOG_ROWS = 6
const PARENT_SOURCE = 'родительский блок'

const sourceName = (target: EventTarget | null): string => {
  if (!(target instanceof HTMLElement)) return 'неизвестный узел'
  return target.dataset.source ?? target.tagName.toLowerCase()
}

export const TooltipEventsDemo = () => {
  const [rows, setRows] = useState<string[]>([])
  const [parentHovered, setParentHovered] = useState(false)
  const [bubbledClicks, setBubbledClicks] = useState(0)
  const counterRef = useRef(0)

  const push = (message: string) => {
    counterRef.current += 1
    const row = `${counterRef.current}. ${message}`
    setRows((prev) => [row, ...prev].slice(0, MAX_LOG_ROWS))
  }

  const handleParentClick = (event: MouseEvent<HTMLDivElement>) => {
    setBubbledClicks((count) => count + 1)

    const source = sourceName(event.target)

    push(
      source === PARENT_SOURCE
        ? 'клик возник на самом родителе — всплытия не было'
        : `родитель поймал клик, он всплыл от «${source}»`,
    )
  }

  const handleParentMouseEnter = () => {
    setParentHovered(true)
    push('родитель: mouseenter')
  }

  const handleParentMouseLeave = () => {
    setParentHovered(false)
    push('родитель: mouseleave — курсор вне его DOM-поддерева')
  }

  const handleBubbledClick = () => {
    push('кнопка не отменяет всплытие — тот же клик уйдёт выше')
  }

  const handleStoppedClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    push('кнопка вызвала e.stopPropagation() — обработчик родителя не сработал')
  }

  return (
    <section>
      <h2>События: всплытие через портал</h2>
      <div
        className={`${styles.parent} ${parentHovered ? styles.parentHovered : ''}`}
        data-source={PARENT_SOURCE}
        role="presentation"
        onClick={handleParentClick}
        onMouseEnter={handleParentMouseEnter}
        onMouseLeave={handleParentMouseLeave}
      >
        <div className={styles.row}>
          <Tooltip content="Тултип кликам не мешает" position={TooltipPosition.Top}>
            <button type="button" data-source="кнопка с всплытием" onClick={handleBubbledClick}>
              Клик всплывает
            </button>
          </Tooltip>
          <Tooltip content="Клик остановлен на кнопке" position={TooltipPosition.Top}>
            <button
              type="button"
              data-source="кнопка со stopPropagation"
              onClick={handleStoppedClick}
            >
              Клик изолирован
            </button>
          </Tooltip>
        </div>
        <p className={styles.status}>
          Кликов дошло до родителя: <strong>{bubbledClicks}</strong>. Родитель под курсором:{' '}
          <strong>{parentHovered ? 'да' : 'нет'}</strong>.
        </p>
      </div>
      {rows.length > 0 && (
        <ul className={styles.log} aria-live="polite">
          {rows.map((row) => (
            <li key={row}>{row}</li>
          ))}
        </ul>
      )}
      <p className={styles.note}>
        У тултипа <code>pointer-events: none</code>: он не перехватывает события, клик всплывает к
        родителю, а наведение касается только триггера.
      </p>
      <p className={styles.note}>
        Интерактивный контент портала всё равно всплыл бы по react-дереву — его закрывают{' '}
        <code>e.stopPropagation()</code>.
      </p>
    </section>
  )
}
