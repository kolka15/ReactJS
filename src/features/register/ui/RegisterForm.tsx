import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { registerFormSchema } from '../model/schema.ts'
import type { RegisterFormValues } from '../model/types.ts'

import styles from './RegisterForm.module.css'

export const RegisterForm = () => {
  const [registeredUsername, setRegisteredUsername] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: 'onTouched',
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      links: [{ url: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
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
          {...register('username')}
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

      <div className={styles.links}>
        <span className={styles.legend}>Социальные ссылки</span>

        {fields.map((field, index) => (
          <div className={styles.linkRow} key={field.id}>
            <label className={styles.label} htmlFor={`link-${index}`}>
              Ссылка {index + 1}
            </label>
            <div className={styles.linkControls}>
              <input
                id={`link-${index}`}
                className={styles.input}
                type="url"
                placeholder="https://github.com/username"
                aria-invalid={errors.links?.[index]?.url ? 'true' : 'false'}
                aria-describedby={errors.links?.[index]?.url ? `link-${index}-error` : undefined}
                {...register(`links.${index}.url` as const)}
              />
              <button className={styles.remove} type="button" onClick={() => remove(index)}>
                Удалить
              </button>
            </div>
            {errors.links?.[index]?.url && (
              <p id={`link-${index}-error`} className={styles.error}>
                {errors.links[index]?.url?.message}
              </p>
            )}
          </div>
        ))}

        <button className={styles.add} type="button" onClick={() => append({ url: '' })}>
          Добавить ссылку
        </button>
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
