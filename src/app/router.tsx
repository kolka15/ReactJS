import type { ReactElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from 'features/authRouting/ui/ProtectedRoute.tsx'
import { ROUTES, type RouteKey } from 'shared/config/routes.ts'

import { HomePage } from '../pages/home/ui/HomePage'
import { LoginPage } from '../pages/login/ui/LoginPage'
import { NotFoundPage } from '../pages/not-found/ui/NotFoundPage'
import { ProfilePage } from '../pages/profile/ui/ProfilePage'
import { PublicPage } from '../pages/public/ui/PublicPage'
import { RefExamplesPage } from '../pages/ref-examples/ui/RefExamplesPage'
import { RegisterPage } from '../pages/register/ui/RegisterPage'
import { SignUpPage } from '../pages/sign-up/ui/SignUpPage'
import { SubscribePage } from '../pages/subscribe/ui/SubscribePage'
import { TaskPage } from '../pages/tasks/ui/TaskPage'

const PAGES = {
  home: <HomePage />,
  tasks: <TaskPage />,
  register: <RegisterPage />,
  subscribe: <SubscribePage />,
  refExamples: <RefExamplesPage />,
} satisfies Record<Exclude<RouteKey, 'public' | 'login' | 'signUp' | 'profile'>, ReactElement>

type PageKey = keyof typeof PAGES

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {(Object.keys(PAGES) as PageKey[]).map((key) => (
        <Route key={key} path={ROUTES[key]} element={PAGES[key]} />
      ))}

      <Route path={ROUTES.public} element={<PublicPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.signUp} element={<SignUpPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.profile} element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
)
