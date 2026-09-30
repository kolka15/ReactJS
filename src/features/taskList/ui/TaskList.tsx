import type { Filter } from '../model/useTasks.ts'

import type { Task } from 'entities/task/model/types.ts'
import { TaskCard } from 'entities/task/ui/TaskCard.tsx'
import { FilterButton } from 'shared/ui/FilterButton.tsx'

import styles from './TaskList.module.css'

const FILTERS: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: 'все' },
  { value: 'completed', label: 'выполненные' },
  { value: 'incomplete', label: 'в работе' },
]

export interface TaskListProps {
  tasks: Task[]
  filter: Filter
  onFilterChange: (filter: Filter) => void
  onRemove: (id: string) => void
  onToggle: (id: string) => void
}

export const TaskList = ({ tasks, filter, onFilterChange, onRemove, onToggle }: TaskListProps) => (
  <>
    <div className={styles.bar} role="group" aria-label="Фильтр задач по статусу">
      {FILTERS.map((option) => (
        <FilterButton
          key={option.value}
          label={option.label}
          active={option.value === filter}
          onClick={() => onFilterChange(option.value)}
        />
      ))}
    </div>

    <p aria-live="polite">показано {tasks.length}</p>

    {tasks.length === 0 ? (
      <p className={styles.empty}>Под текущий фильтр нет ни одной задачи</p>
    ) : (
      <ul className={styles.list}>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} onToggle={onToggle} onRemove={onRemove} />
          </li>
        ))}
      </ul>
    )}
  </>
)
