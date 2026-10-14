import { subscribeEmailSchema } from './schema.ts'
import type { SubscribeWizardState } from './types.ts'

const SUBSCRIBE_DELAY_MS = 900

export const initialWizardState: SubscribeWizardState = {
  step: 'email',
  email: '',
  error: null,
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const subscribeWizardAction = async (
  _prevState: SubscribeWizardState,
  formData: FormData,
): Promise<SubscribeWizardState> => {
  const email = String(formData.get('email') ?? '')
  const trigger = String(formData.get('step') ?? 'validate')

  if (trigger === 'subscribe') {
    await wait(SUBSCRIBE_DELAY_MS)
    return { step: 'subscribed', email, error: null }
  }

  if (trigger === 'back') return { step: 'email', email, error: null }
  if (trigger === 'restart') return initialWizardState

  const parsed = subscribeEmailSchema.safeParse({ email })

  if (!parsed.success) {
    return {
      step: 'email',
      email,
      error: parsed.error.issues[0]?.message ?? 'Некорректный email',
    }
  }

  return { step: 'confirm', email: parsed.data.email, error: null }
}
