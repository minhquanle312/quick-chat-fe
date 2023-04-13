// import useAxiosPrivate from '@hooks/useAxiosPrivate'
import { axiosPrivate, handleAxiosError } from './axios'

type ChatList = {
  data: []
  results: number
  status: string
}

interface Message {
  content: string
}

const useChatsApi = () => {
  // const axiosPrivate = useAxiosPrivate()

  const getChatList = async (): Promise<ChatList> => {
    const res = await axiosPrivate.get('/chats/getMyChats')
    return res.data
  }

  const getConversation = async (
    chatId: string | undefined
  ): Promise<ChatList> => {
    const res = await axiosPrivate.get(
      `/chats/${chatId}/message?sort=createdAt`
    )
    return res.data
  }

  const createNewMessage = async (
    chatId: string | undefined,
    body: Message
  ) => {
    const res = await axiosPrivate.post(
      `/chats/${chatId}/message`,
      JSON.stringify(body)
    )
    return res.data
  }

  const createNewChat = async (members: string[], isGroup?: Boolean) => {
    try {
      const res = await axiosPrivate.post(
        '/chats',
        JSON.stringify(isGroup ? { isGroup, members } : { members })
      )
      return res.data
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  return { getChatList, getConversation, createNewMessage, createNewChat }
}

export default useChatsApi
