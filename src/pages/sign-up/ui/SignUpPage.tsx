import { Link } from 'react-router-dom'

import { SignUpForm } from 'features/authRouting/ui/SignUpForm.tsx'
import { ROUTES } from 'shared/config/routes.ts'

export const SignUpPage = () => (
  <main>
    <p>
      <Link to={ROUTES.public}>← Назад</Link>
    </p>
    <h1>Регистрация</h1>
    <p>
      Уже есть аккаунт? <Link to={ROUTES.login}>Вход</Link>.
    </p>
    <SignUpForm />
  </main>
)
