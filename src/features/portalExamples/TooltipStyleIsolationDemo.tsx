import { Tooltip } from 'shared/ui/Tooltip/Tooltip.tsx'
import { TooltipPosition } from 'shared/ui/Tooltip/TooltipPosition.ts'

import styles from './TooltipStyleIsolationDemo.module.css'

export const TooltipStyleIsolationDemo = () => (
  <section>
    <h2>Изоляция стилей</h2>
    <div className={styles.hostile}>
      <div className={styles.row}>
        <Tooltip content="Тултип не унаследовал стили родителя" position={TooltipPosition.Bottom}>
          <button type="button">Наведи на меня</button>
        </Tooltip>
      </div>
      <p className={styles.tooltip}>Класс tooltip объявлен и здесь, и в модуле тултипа.</p>
    </div>
    <p className={styles.note}>
      Портал выносит узел в <code>#tooltip-root</code>, вне DOM-поддерева родителя: наследуемые
      стили, селекторы <code>.hostile div</code> и <code>overflow: hidden</code> до него не достают.
    </p>
    <p className={styles.note}>
      Одноимённые <code>.tooltip</code> из разных CSS-модулей не конфликтуют — имена хешируются.
      Наследуемое, что важно тултипу, закреплено явно в <code>Tooltip.module.css</code>.
    </p>
  </section>
)
