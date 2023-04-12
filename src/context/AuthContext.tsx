import { useLocalStorage } from '@hooks/useLocalStorage'
import { createContext } from 'react'
import {
  LoginBody,
  SignUpBody,
  login as loginApi,
  signUp as signUpApi,
  verifyEmailApi,
} from '@api/authApi'

interface UserData {
  email: string
  role: string
  id: string
  name: string
  avatar?: string | undefined | null
}

interface UpdateInfoData {
  name: string
  avatar?: string | null
}

interface AuthContextType {
  userData: UserData | null
  // accessToken: string | null
  login: (data: LoginBody) => Promise<void>
  signUp: (data: SignUpBody) => Promise<void>
  verifyEmail: (emailToken: string) => Promise<void>
  logout: () => void
  updateInfo: (data: UpdateInfoData) => void
}

export const AuthContext = createContext<AuthContextType>({
  userData: null,
  // accessToken: null,
  login: async () => {},
  signUp: async () => {},
  verifyEmail: async () => {},
  logout: () => {},
  updateInfo: () => {},
})

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [userData, setUserData] = useLocalStorage<UserData | null>(
    'userData',
    null
  )
  // const [accessToken, setAccessToken] = useLocalStorage<string | null>(
  //   'accessToken',
  //   null
  // )

  const login = async (data: LoginBody): Promise<void> => {
    try {
      const res = await loginApi(data)
      const { email, id, name, role, avatar } = res.data.user
      setUserData({ name, id, role, email, avatar })
      // setAccessToken(res.token)
    } catch (error: any) {
      return Promise.reject(error?.response?.data || error)
    }
  }

  const signUp = async (data: SignUpBody): Promise<void> => {
    try {
      await signUpApi(data)
    } catch (error) {
      console.log(error)
    }
  }

  const verifyEmail = async (emailToken: string): Promise<void> => {
    try {
      const res = await verifyEmailApi(emailToken)
      const { email, id, name, role, avatar } = res.data.user
      setUserData({ name, id, role, email, avatar })
      // setAccessToken(res.token)
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    setUserData(null)
    // setAccessToken(null)
  }

  const updateInfo = (data: UpdateInfoData) => {
    if (!userData) return
    const newData: UserData = {
      ...userData,
      name: data.name,
      // avatar: data?.avatar || undefined,
    }
    if (data?.avatar) newData.avatar = data?.avatar

    setUserData(newData)
  }

  const contextValue = {
    userData,
    // accessToken,
    login,
    signUp,
    verifyEmail,
    logout,
    updateInfo,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
