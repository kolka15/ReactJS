export type SubscribeStep = 'email' | 'confirm' | 'subscribed'

export interface SubscribeWizardState {
  step: SubscribeStep
  email: string
  error: string | null
}
