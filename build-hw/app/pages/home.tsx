import type { ReactElement } from 'react'
import { filterTasks, type Filter, type Task } from '../utils.ts'

const filter: Filter = 'incomplete'

export function Page({ tasks }: { tasks: Task[] }): ReactElement {
  return (
    <div>
      <h1>Главная</h1>
      <ul>
        {filterTasks(tasks, filter).map((task) => (
          <li key={task.id}>
            {task.id} - {task.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
