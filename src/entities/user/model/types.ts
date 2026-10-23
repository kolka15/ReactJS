export interface User {
  id: string
  email: string
  name: string
  avatarPath?: string | null
  about?: string | null
  phone?: string | null
  roles?: string[]
}
