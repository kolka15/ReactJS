import { useTasks } from 'features/taskList/model/useTasks.ts'
import { TaskList } from 'features/taskList/ui/TaskList.tsx'

export const TaskWidget = () => {
  const { tasks, filter, setFilter, removeTask } = useTasks()

  return (
    <section aria-label="Список задач">
      <TaskList tasks={tasks} filter={filter} onFilterChange={setFilter} onRemove={removeTask} />
    </section>
  )
}
