import { Link } from 'react-router-dom'

import { LoginForm } from 'features/authRouting/ui/LoginForm.tsx'
import { ROUTES } from 'shared/config/routes.ts'

export const LoginPage = () => (
  <main>
    <p>
      <Link to={ROUTES.public}>← Назад</Link>
    </p>
    <h1>Вход</h1>
    <p>
      Ещё нет аккаунта? <Link to={ROUTES.signUp}>Регистрация</Link>.
    </p>
    <LoginForm />
  </main>
)
