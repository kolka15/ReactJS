export interface Task {
  id: string
  title: string
  completed: boolean
}

export type Filter = 'all' | 'completed' | 'incomplete'

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

export const filterTasks = (tasks: Task[], filter: Filter): Task[] =>
  tasks.filter((task) => matches(task, filter))

export const isValidEmail = (value: string): boolean => /^[^@\s]+@[^@\s]+$/.test(value)

export const wait = (ms: number): Promise<string> =>
  new Promise((resolve) => setTimeout(() => resolve('TREE_SHAKE_MARKER'), ms))

export const formatDuration = (ms: number): string => `${ms}ms remaining`
