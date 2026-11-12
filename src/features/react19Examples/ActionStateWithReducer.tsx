import { useActionState } from 'react'

const SAVE_DELAY_MS = 1000

type ProfileField = 'fullName' | 'email' | 'bio'
type FormStatus = 'idle' | 'submitting' | 'success'

interface ProfileValues {
  fullName: string
  email: string
  bio: string
}

interface FormState {
  status: 'idle' | 'success'
  dirty: boolean
  saved: ProfileValues | null
}

type FormEvent =
  | { type: 'touch' }
  | { type: 'save'; values: ProfileValues }
  | { type: 'reset' }

type FormPayload = FormData | FormEvent

const EMPTY_VALUES: ProfileValues = { fullName: '', email: '', bio: '' }

const initialFormState: FormState = { status: 'idle', dirty: false, saved: null }

const readValues = (formData: FormData): ProfileValues => ({
  fullName: String(formData.get('fullName') ?? '').trim(),
  email: String(formData.get('email') ?? '').trim(),
  bio: String(formData.get('bio') ?? '').trim(),
})

const isDirty = (values: ProfileValues) =>
  (Object.keys(EMPTY_VALUES) as ProfileField[]).some(
    (field) => values[field] !== EMPTY_VALUES[field],
  )

const formReducer = (state: FormState, event: FormEvent): FormState => {
  switch (event.type) {
    case 'touch':
      return state.dirty ? state : { ...state, dirty: true }
    case 'save':
      return { status: 'success', dirty: false, saved: event.values }
    case 'reset':
      return initialFormState
  }
}

const saveValues = async (prevState: FormState, values: ProfileValues): Promise<FormState> => {
  await new Promise((resolve) => setTimeout(resolve, SAVE_DELAY_MS))

  return formReducer(prevState, { type: 'save', values })
}

// Возвращает промис только для асинхронного сохранения: синхронные переходы (touch/reset)
// редюсер применяет сразу, вне transition.
const profileFormAction = (
  prevState: FormState,
  payload: FormPayload,
): FormState | Promise<FormState> => {
  if (!(payload instanceof FormData)) return formReducer(prevState, payload)

  if (String(payload.get('intent') ?? 'save') === 'reset') {
    return formReducer(prevState, { type: 'reset' })
  }

  const values = readValues(payload)

  if (!isDirty(values)) return prevState

  return saveValues(prevState, values)
}

export const ActionStateWithReducer = () => {
  const [state, submit, isPending] = useActionState(profileFormAction, initialFormState)

  const status: FormStatus = isPending ? 'submitting' : state.status
  const saved = state.saved

  return (
    <section>
      <h2>ActionStateWithReducer</h2>
      <p>
        Состояние формы — машина переходов: <code>useActionState</code> вызывается с редюсером,
        который по событию <code>touch</code> помечает форму изменённой, по <code>save</code>{' '}
        переводит в success и сохраняет значения, а по <code>reset</code> возвращает начальное
        состояние. Поля при этом остаются неуправляемыми, поэтому ввод текста форму не перерисовывает.
      </p>

      <form action={submit}>
        <p>
          <label htmlFor="reducer-full-name">Имя и фамилия</label>
          <input
            id="reducer-full-name"
            name="fullName"
            defaultValue=""
            required
            disabled={isPending}
            onBlur={() => submit({ type: 'touch' })}
          />
        </p>

        <p>
          <label htmlFor="reducer-email">Email</label>
          <input
            id="reducer-email"
            name="email"
            type="email"
            defaultValue=""
            required
            disabled={isPending}
            onBlur={() => submit({ type: 'touch' })}
          />
        </p>

        <p>
          <label htmlFor="reducer-bio">О себе</label>
          <textarea
            id="reducer-bio"
            name="bio"
            defaultValue=""
            rows={3}
            disabled={isPending}
            onBlur={() => submit({ type: 'touch' })}
          />
        </p>

        <p>
          <button type="submit" name="intent" value="save" disabled={isPending}>
            {status === 'submitting' ? 'Saving…' : status === 'success' ? 'Saved!' : 'Сохранить'}
          </button>
          <button type="submit" name="intent" value="reset" disabled={isPending}>
            Сбросить
          </button>
        </p>
      </form>

      <p role="status">
        {status === 'idle' && 'Статус: idle'}
        {status === 'submitting' && 'Статус: submitting — сохраняем…'}
        {status === 'success' &&
          `Статус: success — сохранено: ${saved?.fullName}, ${saved?.email}${saved?.bio ? `, ${saved.bio}` : ''}`}
        {state.dirty && status !== 'submitting' && ' · поля изменены (dirty)'}
      </p>
    </section>
  )
}
