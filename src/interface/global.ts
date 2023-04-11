export interface ChatInterface {
  id: string
  name?: string
  avatar?: string
  isGroup: Boolean
  members: [
    { email: string; id: string; name: string; role: string; avatar?: string }
  ]
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
