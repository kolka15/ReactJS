import { z } from 'zod'

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+$/

export interface LoginFormValues {
    email: string
    password: string
}

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Укажите email')
    .regex(EMAIL_PATTERN, 'Email должен содержать @'),
  password: z.string().min(1, 'Укажите пароль'),
})
