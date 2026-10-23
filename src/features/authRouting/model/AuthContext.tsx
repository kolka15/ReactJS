import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react'

import { TOKEN_KEY } from 'shared/api/authToken.ts'

export interface AuthUser {
  id: string
  username: string
}

export interface AuthContextValue {
  token: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  signIn: (token: string, user: AuthUser) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState<AuthUser | null>(null)

  const signIn = useCallback((nextToken: string, nextUser: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, nextToken)
    setToken(nextToken)
    setUser(nextUser)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ token, user, isAuthenticated: token !== null, signIn, signOut }),
    [token, user, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
