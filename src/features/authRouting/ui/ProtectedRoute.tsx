import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from 'shared/config/routes.ts'

import { useAuth } from '../model/useAuth.ts'

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return <Navigate to={ROUTES.login} replace />

  return <Outlet />
}
