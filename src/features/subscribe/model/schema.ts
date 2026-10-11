import { z } from 'zod'

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+$/

export const subscribeEmailSchema = z.object({
  email: z
    .string()
    .min(1, 'Укажите email')
    .regex(EMAIL_PATTERN, 'Email должен содержать @'),
})
