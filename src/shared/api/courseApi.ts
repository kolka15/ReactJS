import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { TOKEN_KEY } from './authToken.ts'

export const USER_TAG = 'User'

export const courseApi = createApi({
  reducerPath: 'courseApi',
  tagTypes: [USER_TAG],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.v2.react-learning.ru/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(TOKEN_KEY)

      if (token) {
        headers.set('authorization', /^Bearer\b/i.test(token) ? token : `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
})
