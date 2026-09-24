import type { ReactNode } from 'react'

import type { Task } from '../model/types'

import styles from './TaskCard.module.css'

export interface TaskCardProps {
  task: Task
  action?: ReactNode
}

export const TaskCard = ({ task, action }: TaskCardProps) => {
  const cardClass = task.completed ? `${styles.card} ${styles.done}` : styles.card

  return (
    <article className={cardClass}>
      <h3 className={styles.title}>
        {task.id}. {task.title}
      </h3>

      <p className={styles.status}>{task.completed ? 'выполнено' : 'в работе'}</p>

      {action}
    </article>
  )
}
