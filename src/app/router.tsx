import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { NotFoundPage } from '../pages/not-found/ui/NotFoundPage'
import { TaskPage } from '../pages/tasks/ui/TaskPage'

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TaskPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
)
