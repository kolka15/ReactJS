import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useGetTasksQuery } from 'entities/task/api/tasksApi.ts'
import type { Task } from 'entities/task/model/types.ts'


export type Filter = 'all' | 'completed' | 'incomplete'

export interface UseTasksResult {
  tasks: Task[]
  filter: Filter
  setFilter: (filter: Filter) => void
  removeTask: (id: string) => void
  toggleTask: (id: string) => void
}

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

export const useTasks = (): UseTasksResult => {
  const { data } = useGetTasksQuery()
  const [filter, setFilter] = useState<Filter>('all')
  const [localTasks, setLocalTasks] = useState<Task[]>([])
  const copiedRef = useRef(false)

  useEffect(() => {
    if (copiedRef.current || !data) return
    copiedRef.current = true
    setLocalTasks(data)
  }, [data])

  const tasks = useMemo(() => localTasks.filter((task) => matches(task, filter)),
    [localTasks, filter],
  )

  const removeTask = useCallback((id: string) => {
    setLocalTasks((current) => current.filter((task) => task.id !== id))
  }, [])

  const toggleTask = useCallback((id: string) => {
    setLocalTasks((current) => current.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }, [])

  return { tasks, filter, setFilter, removeTask, toggleTask }
}
