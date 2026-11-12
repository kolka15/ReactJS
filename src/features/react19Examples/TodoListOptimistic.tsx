import { useOptimistic, useState } from 'react'

const SAVE_DELAY_MS = 1000

interface Todo {
  id: string
  text: string
  optimistic: boolean
}

const initialTodos: Todo[] = [
  { id: 'todo-1', text: 'Прочитать про useActionState', optimistic: false },
  { id: 'todo-2', text: 'Разобраться с React Compiler', optimistic: false },
]

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const saveTodo = async (todo: Todo): Promise<Todo> => {
  await wait(SAVE_DELAY_MS)

  return { ...todo, optimistic: false }
}

export const TodoListOptimistic = () => {
  const [todos, setTodos] = useState(initialTodos)
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state: Todo[], todo: Todo) => [...state, todo],
  )

  const addTodo = async (formData: FormData) => {
    const text = String(formData.get('text') ?? '').trim()

    if (text === '') return

    const draft: Todo = { id: crypto.randomUUID(), text, optimistic: true }

    addOptimisticTodo(draft)

    const saved = await saveTodo(draft)

    setTodos((prev) => [...prev, saved])
  }

  return (
    <section>
      <h2>TodoListOptimistic</h2>

      <form action={addTodo}>
        <label htmlFor="todo-text">Новая задача</label>
        <p>
          <input id="todo-text" name="text" defaultValue="" autoComplete="off" required />
          <button type="submit">Добавить</button>
        </p>
      </form>

      <p role="status">Всего задач: {optimisticTodos.length}</p>

      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            {todo.optimistic && <span> · сохраняется…</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}
