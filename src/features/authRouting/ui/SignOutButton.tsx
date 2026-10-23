import { useNavigate } from 'react-router-dom'

import { ROUTES } from 'shared/config/routes.ts'

import { useAuth } from '../model/useAuth.ts'

import styles from './SignOutButton.module.css'

export const SignOutButton = () => {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleClick = () => {
    signOut()
    navigate(ROUTES.login, { replace: true })
  }

  return (
    <button className={styles.button} type="button" onClick={handleClick}>
      Выйти
    </button>
  )
}
