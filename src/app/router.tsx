import type { ReactElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ROUTES, type RouteKey } from 'shared/config/routes.ts'

import { HomePage } from '../pages/home/ui/HomePage'
import { NotFoundPage } from '../pages/not-found/ui/NotFoundPage'
import { RefExamplesPage } from '../pages/ref-examples/ui/RefExamplesPage'
import { RegisterPage } from '../pages/register/ui/RegisterPage'
import { SubscribePage } from '../pages/subscribe/ui/SubscribePage'
import { TaskPage } from '../pages/tasks/ui/TaskPage'

const PAGES: Record<RouteKey, ReactElement> = {
  home: <HomePage />,
  tasks: <TaskPage />,
  register: <RegisterPage />,
  subscribe: <SubscribePage />,
  refExamples: <RefExamplesPage />,
}

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {(Object.keys(ROUTES) as RouteKey[]).map((key) => (
        <Route key={key} path={ROUTES[key]} element={PAGES[key]} />
      ))}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
)
