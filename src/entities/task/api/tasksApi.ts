import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { type Task, type TaskResponse } from '../model/types'


const toTask = ({ id, title, completed }: TaskResponse): Task => ({
  id: String(id),
  title,
  completed,
})

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',

  }),
  tagTypes: ['Tasks'],
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => ({ url: 'todos', params: { _limit: 20 } }),
      transformResponse: (response: TaskResponse[]) => response.map(toTask),
    }),
  }),
})

export const { useGetTasksQuery } = tasksApi
