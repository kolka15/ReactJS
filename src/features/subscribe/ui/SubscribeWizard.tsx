import { useActionState } from 'react'

import { initialWizardState, subscribeWizardAction } from '../model/action.ts'

import styles from './SubscribeWizard.module.css'

export const SubscribeWizard = () => {
  const [state, formAction, isPending] = useActionState(
    subscribeWizardAction,
    initialWizardState,
  )

  return (
    <form className={styles.wizard} noValidate action={formAction}>
      {state.step === 'email' && (
        <>
          <p className={styles.steps}>Шаг 1 из 2</p>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="subscribe-email">
              Email
            </label>
            <input
              id="subscribe-email"
              name="email"
              type="email"
              className={styles.input}
              defaultValue={state.email}
              autoComplete="email"
              placeholder="you@example.com"
              disabled={isPending}
              aria-invalid={state.error ? 'true' : 'false'}
              aria-describedby={state.error ? 'subscribe-email-error' : undefined}
            />
            {state.error && (
              <p id="subscribe-email-error" className={styles.error} role="alert">
                {state.error}
              </p>
            )}
          </div>

          <button
            className={styles.primary}
            type="submit"
            name="step"
            value="validate"
            disabled={isPending}
          >
            {isPending ? 'Проверяем…' : 'Продолжить'}
          </button>
        </>
      )}

      {state.step === 'confirm' && (
        <>
          <p className={styles.steps}>Шаг 2 из 2</p>

          <div className={styles.field}>
            <span className={styles.label}>Подтвердите подписку</span>
            <p className={styles.summary}>
              Будем присылать рассылку на <strong>{state.email}</strong>
            </p>
            <input type="hidden" name="email" value={state.email} />
          </div>

          {isPending && (
            <p className={styles.pending} role="status">
              Отправляем запрос…
            </p>
          )}

          <div className={styles.actions}>
            <button
              className={styles.primary}
              type="submit"
              name="step"
              value="subscribe"
              disabled={isPending}
            >
              {isPending ? 'Отправка…' : 'Подписаться'}
            </button>
            <button
              className={styles.secondary}
              type="submit"
              name="step"
              value="back"
              disabled={isPending}
            >
              Назад
            </button>
          </div>
        </>
      )}

      {state.step === 'subscribed' && (
        <>
          <p className={styles.success} role="status">
            Вы подписаны на рассылку: {state.email}
          </p>

          <button
            className={styles.secondary}
            type="submit"
            name="step"
            value="restart"
            disabled={isPending}
          >
            Подписаться другим адресом
          </button>
        </>
      )}
    </form>
  )
}
