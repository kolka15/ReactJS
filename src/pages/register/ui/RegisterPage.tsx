import { Link } from 'react-router-dom'

import { RegisterForm } from 'features/register/ui/RegisterForm.tsx'
import { ROUTES } from 'shared/config/routes.ts'

export const RegisterPage = () => (
  <main>
    <h1>Регистрация</h1>
    <p>
      Нужна только рассылка?{' '}
      <Link to={ROUTES.subscribe}>Подписка на рассылку</Link>.
    </p>
    <RegisterForm />
  </main>
)
