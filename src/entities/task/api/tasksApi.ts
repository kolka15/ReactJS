import { baseApi } from 'shared/api/baseApi.ts'

import { type Task, type TaskResponse } from '../model/types'

const toTask = ({ id, title, completed }: TaskResponse): Task => ({
  id: String(id),
  title,
  completed,
})

const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => ({ url: 'todos', params: { _limit: 20 } }),
      transformResponse: (response: TaskResponse[]) => response.map(toTask),
    }),
  }),
})

export const { useGetTasksQuery } = tasksApi
