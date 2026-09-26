import { useCallback, useMemo, useState } from 'react'

import type { Task } from 'entities/task/model/types.ts'

export type Filter = 'all' | 'completed' | 'incomplete'

export interface UseTasksResult {
  tasks: Task[]
  filter: Filter
  setFilter: (filter: Filter) => void
  removeTask: (id: string) => void
  toggleTask: (id: string) => void
}

const defaultTasks: Task[] = [
  { id: '01', title: 'Разобрать структуру Feature-Sliced Design', completed: true },
  { id: '02', title: 'Описать тип Task и компонент TaskCard', completed: true },
  { id: '03', title: 'Собрать список задач с фильтрацией', completed: false },
  { id: '04', title: 'Привязать страницу задач к роутеру', completed: false },
  { id: '05', title: 'Вынести кнопку фильтра в shared', completed: false },
]

const matches = (task: Task, filter: Filter): boolean => {
  switch (filter) {
    case 'completed':
      return task.completed
    case 'incomplete':
      return !task.completed
    case 'all':
      return true
  }
}

export const useTasks = (initial: Task[] = defaultTasks): UseTasksResult => {
  const [sources, setSources] = useState<Task[]>(initial)
  const [filter, setFilter] = useState<Filter>('all')

  const tasks = useMemo(() => sources.filter((task) => matches(task, filter)),
    [sources, filter],
  )

  const removeTask = useCallback((id: string) => {
    setSources((current) => current.filter((task) => task.id !== id))
  }, [])

  const toggleTask = useCallback((id: string) => {
    setSources((current) => current.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }, [])

  return { tasks, filter, setFilter, removeTask, toggleTask }
}
