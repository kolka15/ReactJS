import { z } from 'zod'


const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+$/

export interface SignUpFormValues {
  email: string
  password: string
  confirmPassword: string
}

export const signUpFormSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Укажите email')
      .regex(EMAIL_PATTERN, 'Email должен содержать @'),
    password: z
      .string()
      .min(1, 'Укажите пароль'),
    confirmPassword: z.string().min(1, 'Повторите пароль'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })
