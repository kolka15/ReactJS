import { Link } from 'react-router-dom'

import { useGetMeQuery } from 'entities/user/api/userApi.ts'
import { SignOutButton } from 'features/authRouting/ui/SignOutButton.tsx'
import { ROUTES } from 'shared/config/routes.ts'

export const ProfilePage = () => {
  const { data, isLoading, isError } = useGetMeQuery()

  return (
    <main>
      <p>
        <Link to={ROUTES.public}>← Назад</Link>
      </p>
      <h1>Профиль</h1>
      <p>Защищённая страница: доступна только с токеном в localStorage.</p>
      {isLoading && <p>Загрузка профиля…</p>}
      {isError && <p>Не удалось загрузить профиль.</p>}
      {data && <p>Имя: {data.name}</p>}
      <SignOutButton />
    </main>
  )
}
