import { useState } from 'react'
import { useForm } from 'react-hook-form'

import type { RegisterFormValues } from '../model/types.ts'

import styles from './RegisterForm.module.css'

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+$/

export const RegisterForm = () => {
  const [registeredUsername, setRegisteredUsername] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: 'onTouched',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = ({ username }: RegisterFormValues) => {
    setRegisteredUsername(username)
    reset()
  }

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="username">
          Имя пользователя
        </label>
        <input
          id="username"
          className={styles.input}
          autoComplete="username"
          aria-invalid={errors.username ? 'true' : 'false'}
          aria-describedby={errors.username ? 'username-error' : undefined}
          {...register('username', { required: 'Укажите имя пользователя' })}
        />
        {errors.username && (
          <p id="username-error" className={styles.error}>
            {errors.username.message}
          </p>
        )}
      </div>

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
          {...register('email', {
            required: 'Укажите email',
            pattern: { value: EMAIL_PATTERN, message: 'Email должен содержать @' },
          })}
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
          {...register('password', {
            required: 'Укажите пароль',
            minLength: { value: 6, message: 'Пароль должен быть не короче 6 символов' },
          })}
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
          {...register('confirmPassword', {
            required: 'Повторите пароль',
            deps: ['password'],
            validate: (value, values) => value === values.password || 'Пароли не совпадают',
          })}
        />
        {errors.confirmPassword && (
          <p id="confirmPassword-error" className={styles.error}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button className={styles.submit} type="submit">
        Зарегистрироваться
      </button>

      {registeredUsername !== null && (
        <p className={styles.success} role="status">
          Пользователь {registeredUsername} зарегистрирован
        </p>
      )}
    </form>
  )
}
