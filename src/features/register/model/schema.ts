import { z } from 'zod'

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+$/

export const registerFormSchema = z
  .object({
    username: z.string().min(1, 'Укажите имя пользователя'),
    email: z
      .string()
      .min(1, 'Укажите email')
      .regex(EMAIL_PATTERN, 'Email должен содержать @'),
    password: z
      .string()
      .min(1, 'Укажите пароль')
      .min(6, 'Пароль должен быть не короче 6 символов'),
    confirmPassword: z.string().min(1, 'Повторите пароль'),
    links: z.array(z.object({ url: z.string().url('Некорректный URL') })),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })
