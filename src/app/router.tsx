import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { NotFoundPage } from '../pages/not-found/ui/NotFoundPage'
import { RegisterPage } from '../pages/register/ui/RegisterPage'
import { TaskPage } from '../pages/tasks/ui/TaskPage'

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/taskpage" element={<TaskPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
)
