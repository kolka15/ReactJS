export interface RegisterFormLink {
  url: string
}

export interface RegisterFormValues {
  username: string
  email: string
  password: string
  confirmPassword: string
  links: RegisterFormLink[]
}
