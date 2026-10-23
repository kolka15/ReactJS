import { courseApi, USER_TAG } from 'shared/api/courseApi.ts'

import { type AuthUser } from '../model/AuthContext.tsx'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  roles: string[]
}

interface AuthResponse {
  token?: string
  accessToken?: string
  access_token?: string
  id?: string | number
  name?: string
  username?: string
  email?: string
  user?: { id?: string | number; name?: string; username?: string; email?: string }
}

export interface AuthSession {
  token: string
  user: AuthUser
}

export const toSession = (response: AuthResponse, fallbackEmail: string): AuthSession | null => {
  const token = response.token ?? response.accessToken ?? response.access_token

  if (!token) return null

  return {
    token,
    user: {
      id: String(response.user?.id ?? response.id ?? ''),
      username:
        response.user?.username ??
        response.user?.name ??
        response.username ??
        response.name ??
        (response.user?.email ?? response.email ?? fallbackEmail),
    },
  }
}

export const errorText = (error: unknown, fallback: string): string => {
  if (error && typeof error === 'object' && 'data' in error) {
    const { message } = (error as { data?: { message?: string | string[] } }).data ?? {}
    const text = Array.isArray(message) ? message.join(', ') : message

    if (text) return text
  }

  return fallback
}

const authApi = courseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginPayload>({
      query: (credentials) => ({ url: 'auth/login', method: 'POST', body: credentials }),
      invalidatesTags: [USER_TAG],
    }),
    register: build.mutation<AuthResponse, RegisterPayload>({
      query: (credentials) => ({ url: 'auth/register', method: 'POST', body: credentials }),
      invalidatesTags: [USER_TAG],
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
