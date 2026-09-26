import React from 'react'

import type { Task } from '../model/types'

import styles from './TaskCard.module.css'


export interface TaskCardProps {
    task: Task
    onToggle: (id: string) => void
    onRemove: (id: string) => void
}

export const TaskCard = React.memo(({ task, onToggle, onRemove }: TaskCardProps) => {
    const cardClass = task.completed ? `${styles.card} ${styles.done}` : styles.card

    return (
        <article className={cardClass}>
            <h3 className={styles.title}>
                {task.id}. {task.title}
            </h3>

            <button
                type="button"
                className={`${styles.status} ${styles.toggle}`}
                aria-pressed={task.completed}
                aria-label={task.completed ? `Снять отметку с задачи «${task.title}»` : `Отметить задачу «${task.title}» как выполненную`}
                onClick={() => onToggle(task.id)}
            >
                {task.completed ? 'выполнено' : 'в работе'}
            </button>

            <button
                type="button"
                className={styles.remove}
                aria-label={`Удалить задачу «${task.title}»`}
                onClick={() => onRemove(task.id)}
            >
                ✕
            </button>
        </article>
    )
})

TaskCard.displayName = 'TaskCard'
