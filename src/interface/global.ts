export interface ChatInterface {
  id: string
  name?: string
  avatar?: string
  isGroup: Boolean
  members: UserInterface[]
  latestMessage?: { content?: string; updatedAt: string }
}

export interface MessageInterface {
  chat?: string
  content?: string
  createAt?: string
  id?: string
  photos?: string[]
  sendUser?: string
  updatedAt?: string
}

export interface UserInterface {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  validatedEmail?: Boolean
}
