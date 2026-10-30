import { courseApi, USER_TAG } from 'shared/api/courseApi.ts'

import { type User } from '../model/types.ts'

const userApi = courseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<User, void>({
      query: () => ({ url: 'users/me' }),
      providesTags: [USER_TAG],
    }),
  }),
})

export const { useGetMeQuery } = userApi
