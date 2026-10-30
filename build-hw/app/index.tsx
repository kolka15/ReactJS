import { createRoot } from 'react-dom/client'
import { resolveRoute, routes } from './routes.ts'
import { isValidEmail, type Task } from './utils.ts'

const tasks: Task[] = [
  { id: 't1', title: 'Собрать FSD-структуру', completed: true },
  { id: 't2', title: 'Подключить RTK Query', completed: false },
]

async function render(): Promise<void> {
  const root = createRoot(document.getElementById('root')!)
  const { sum } = await import('../lib/math.ts')
  const { Page } = await routes[resolveRoute()]()

  const done = tasks.filter((task) => task.completed).length

  root.render(
    <>
      <p>email ok: {String(isValidEmail('student@example.com'))}</p>
      <Page tasks={tasks} />
      <p>всего {sum(done, tasks.length - done)} задач</p>
    </>,
  )
}

render()
