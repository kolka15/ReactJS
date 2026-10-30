import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from 'shared/config/routes.ts'

import { errorText, toSession, useLoginMutation } from '../api/authApi.ts'
import { loginFormSchema, type LoginFormValues } from '../model/loginSchema.ts'
import { useAuth } from '../model/useAuth.ts'

import styles from './AuthForm.module.css'

export const LoginForm = () => {
  const [failure, setFailure] = useState<string | null>(null)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: 'onTouched',
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    setFailure(null)

    const result = await login({ email, password })
    const session = result.data ? toSession(result.data, email) : null

    if (!session) {
      setFailure(errorText(result.error, 'Не удалось войти — проверьте email и пароль'))
      return
    }

    signIn(session.token, session.user)
    navigate(ROUTES.profile, { replace: true })
  }

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={styles.input}
          autoComplete="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" className={styles.error}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          Пароль
        </label>
        <input
          id="password"
          type="password"
          className={styles.input}
          autoComplete="current-password"
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby={errors.password ? 'password-error' : undefined}
          {...register('password')}
        />
        {errors.password && (
          <p id="password-error" className={styles.error}>
            {errors.password.message}
          </p>
        )}
      </div>

      <button className={styles.submit} type="submit" disabled={isLoading}>
        {isLoading ? 'Входим…' : 'Войти'}
      </button>

      {failure !== null && (
        <p className={styles.error} role="alert">
          {failure}
        </p>
      )}
    </form>
  )
}
