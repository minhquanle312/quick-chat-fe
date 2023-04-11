import useAxiosPrivate from '@hooks/useAxiosPrivate'

type UserData = {
  data: []
  results: number
  status: string
}

interface UpdateUserBody {
  name?: string
  avatar?: string | null
}

const useUserApi = () => {
  const axiosPrivate = useAxiosPrivate()

  // const getChatList = async (): Promise<ChatList> => {
  //   const res = await axiosPrivate.get('/chats/getMyChats')
  //   return res.data
  // }

  const updateCurrentUser = async (body: UpdateUserBody): Promise<UserData> => {
    const res = await axiosPrivate.patch(
      `/users/updateMe`,
      JSON.stringify(body),
      {
        withCredentials: true,
      }
    )

    return res.data
  }

  return { updateCurrentUser }
}

export default useUserApi
