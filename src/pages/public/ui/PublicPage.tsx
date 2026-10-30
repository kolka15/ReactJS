import { Link } from 'react-router-dom'

import { useGetMeQuery } from 'entities/user/api/userApi.ts'
import { useAuth } from 'features/authRouting/model/useAuth.ts'
import { SignOutButton } from 'features/authRouting/ui/SignOutButton.tsx'
import { ROUTES } from 'shared/config/routes.ts'

import styles from './PublicPage.module.css'

export const PublicPage = () => {
  const { isAuthenticated } = useAuth()
  const { data: me } = useGetMeQuery(undefined, { skip: !isAuthenticated })

  const badgeClass = isAuthenticated ? `${styles.badge} ${styles.authenticated}` : styles.badge

  const signedInText = me?.name ? `вход выполнен (${me.name})` : 'вход выполнен'
  const badgeText = isAuthenticated ? signedInText : 'гость'

  return (
    <main>
      <p>
        <Link to={ROUTES.home}>← На главную</Link>
      </p>
      <h1>Публичная страница</h1>
      <p>Открыта без токена: доступна и гостю, и авторизованному пользователю.</p>
      <p className={styles.status}>
        Статус:
        <span className={badgeClass}>{badgeText}</span>
      </p>
      <nav className={styles.nav}>
        {isAuthenticated ? (
          <>
            <Link to={ROUTES.profile}>Профиль</Link>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link to={ROUTES.login}>Войти</Link>
            <Link to={ROUTES.signUp}>Зарегистрироваться</Link>
          </>
        )}
      </nav>
    </main>
  )
}
