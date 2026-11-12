import { useActionState } from 'react'

const SAVE_DELAY_MS = 1000

type SaveStatus = 'idle' | 'saving' | 'success'

interface AsyncSaveState {
  status: Exclude<SaveStatus, 'saving'>
  savedTitle: string
}

const initialSaveState: AsyncSaveState = { status: 'idle', savedTitle: '' }

const saveAction = async (
  _prevState: AsyncSaveState,
  formData: FormData,
): Promise<AsyncSaveState> => {
  const title = String(formData.get('title') ?? '')

  await new Promise((resolve) => setTimeout(resolve, SAVE_DELAY_MS))

  return { status: 'success', savedTitle: title }
}

export const FormWithAsyncSave = () => {
  const [state, submit, isPending] = useActionState(saveAction, initialSaveState)

  const status: SaveStatus = isPending ? 'saving' : state.status

  return (
    <section>
      <h2>FormWithAsyncSave</h2>
      <form action={submit}>
        <label htmlFor="async-save-title">Название</label>
        <p>
          <input
            id="async-save-title"
            name="title"
            defaultValue=""
            required
            disabled={isPending}
          />
          <button type="submit" disabled={isPending}>
            {status === 'saving' ? 'Saving…' : status === 'success' ? 'Saved!' : 'Сохранить'}
          </button>
        </p>

        <p role="status">
          {status === 'idle' && 'Статус: idle'}
          {status === 'saving' && 'Статус: saving — сохраняем…'}
          {status === 'success' && `Статус: success — сохранено «${state.savedTitle}»`}
        </p>
      </form>
    </section>
  )
}
