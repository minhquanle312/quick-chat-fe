import useAxiosPrivate from '@hooks/useAxiosPrivate'

type ChatList = {
  data: []
  results: number
  status: string
}

interface Message {
  content: string
}

const useChatsApi = () => {
  const axiosPrivate = useAxiosPrivate()

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

  return { getChatList, getConversation, createNewMessage }
}

export default useChatsApi
