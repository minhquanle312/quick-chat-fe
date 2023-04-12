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

  const updateCurrentUser = async (body: UpdateUserBody): Promise<UserData> => {
    const res = await axiosPrivate.patch(
      `/users/updateMe`,
      JSON.stringify(body)
    )

    return res.data
  }

  const addContact = async (userEmail: string): Promise<UserData> => {
    try {
      const res = await axiosPrivate.patch(
        `/users/addContact`,
        JSON.stringify({ userEmail })
      )

      return res.data
    } catch (error: any) {
      return Promise.reject(error?.response?.data)
    }
  }

  const getCurrentUser = async () => {
    const res = await axiosPrivate.get(`/users/me`)

    return res.data?.data
  }

  return { updateCurrentUser, getCurrentUser, addContact }
}

export default useUserApi
