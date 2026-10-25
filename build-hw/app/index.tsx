import { createRoot } from 'react-dom/client'
import { filterTasks, isValidEmail, type Task } from './utils.ts'

const tasks: Task[] = [
  { id: 't1', title: 'Собрать FSD-структуру', completed: true },
  { id: 't2', title: 'Подключить RTK Query', completed: false },
]

const incomplete = filterTasks(tasks, 'incomplete')

function App({ done, total }: { done: number; total: number }) {
  return (
    <div>
      <p>email ok: {String(isValidEmail('student@example.com'))}</p>
      <ul>
        {incomplete.map((task) => (
          <li key={task.id}>
            {task.id} - {task.title}
          </li>
        ))}
      </ul>
      <p>
        готово {done} из {total}
      </p>
    </div>
  )
}

async function render(): Promise<void> {
  const root = createRoot(document.getElementById('root')!)
  const { sum } = await import('../lib/math.ts')

  const done = filterTasks(tasks, 'completed').length

  root.render(<App done={done} total={sum(done, incomplete.length)} />)
}

render()
