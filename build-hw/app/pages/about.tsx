import type { ReactElement } from 'react'
import type { Task } from '../utils.ts'

export function Page({ tasks }: { tasks: Task[] }): ReactElement {
  const done = tasks.filter((task) => task.completed).length

  return (
    <div>
      <h1>О проекте</h1>
      <p>
        готово {done} из {tasks.length}
      </p>
    </div>
  )
}
