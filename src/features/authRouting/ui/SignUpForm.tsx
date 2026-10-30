import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from 'shared/config/routes.ts'

import { errorText, toSession, useRegisterMutation } from '../api/authApi.ts'
import { signUpFormSchema, type SignUpFormValues } from '../model/signUpSchema.ts'
import { useAuth } from '../model/useAuth.ts'

import styles from './AuthForm.module.css'

export const SignUpForm = () => {
  const [failure, setFailure] = useState<string | null>(null)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [registerUser, { isLoading }] = useRegisterMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    mode: 'onTouched',
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async ({ email, password }: SignUpFormValues) => {
    setFailure(null)

    const result = await registerUser({ email, password, roles: ['USER'] })

    const session = result.data ? toSession(result.data, email) : null

    if (!session) {
      setFailure(errorText(result.error, 'Не удалось зарегистрироваться'))
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
          autoComplete="new-password"
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

      <div className={styles.field}>
        <label className={styles.label} htmlFor="confirmPassword">
          Подтверждение пароля
        </label>
        <input
          id="confirmPassword"
          type="password"
          className={styles.input}
          autoComplete="new-password"
          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p id="confirmPassword-error" className={styles.error}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button className={styles.submit} type="submit" disabled={isLoading}>
        {isLoading ? 'Создаём аккаунт…' : 'Зарегистрироваться'}
      </button>

      {failure !== null && (
        <p className={styles.error} role="alert">
          {failure}
        </p>
      )}
    </form>
  )
}
